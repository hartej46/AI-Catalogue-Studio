-- =============================================================================
-- ATELIER AI LAB / CATALOGUE STUDIO — COMPLETE DATABASE SCHEMA
-- Paste this entire file into the Supabase SQL Editor and click "Run"
-- =============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 2. TABLE: profiles
--    Stores merchant accounts linked 1:1 with auth.users
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  free_credits INTEGER NOT NULL DEFAULT 0 CHECK (free_credits >= 0),
  paid_credits INTEGER NOT NULL DEFAULT 0 CHECK (paid_credits >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 3. TABLE: jobs
--    Stores image generation tasks and their metadata
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  category_id TEXT,
  style_id TEXT,
  background_id TEXT,
  lighting_id TEXT,
  ratio_id TEXT,
  preset_id TEXT,
  fine_tune JSONB DEFAULT '{}'::jsonb,
  product_name TEXT,
  original_path TEXT,
  result_path TEXT,
  quality TEXT NOT NULL DEFAULT 'preview' CHECK (quality IN ('preview', 'final')),
  credit_kind TEXT CHECK (credit_kind IN ('free', 'paid')),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'done', 'failed')),
  model TEXT,
  qc_result JSONB,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  finished_at TIMESTAMPTZ
);

-- -----------------------------------------------------------------------------
-- 4. TABLE: credit_log
--    Full audit trail of every credit earned, spent, refunded or bought
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.credit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('free', 'paid')),
  change INTEGER NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('signup', 'job', 'refund', 'purchase', 'admin')),
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 5. TABLE: orders
--    Razorpay checkout orders for credit packs
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL UNIQUE,
  pack_id TEXT,
  amount_paise INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 6. TABLE: processed_payments
--    Prevents replay attacks or double-credit fulfillment from webhooks
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.processed_payments (
  razorpay_payment_id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS)
--    Each user can read and manage only their own rows
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_payments ENABLE ROW LEVEL SECURITY;

-- Clean existing policies for idempotency
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can insert own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can read own credit logs" ON public.credit_log;
DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;

-- PROFILES policies
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- JOBS policies
CREATE POLICY "Users can read own jobs"
  ON public.jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jobs"
  ON public.jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- CREDIT_LOG policies (Users can inspect their history, but never forge entries)
CREATE POLICY "Users can read own credit logs"
  ON public.credit_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ORDERS policies
CREATE POLICY "Users can read own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- PROCESSED_PAYMENTS: No client access policy needed (only server role accesses this)

-- -----------------------------------------------------------------------------
-- 8. FUNCTION: take_credit(user_id)
--    Safely deducts 1 credit (free first, else paid), writes credit_log, returns kind.
--    Raises an exception if balance is 0.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.take_credit(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_free_credits INTEGER;
  v_paid_credits INTEGER;
  v_kind_taken TEXT;
BEGIN
  -- Row-level lock to prevent race conditions during generation requests
  SELECT free_credits, paid_credits
    INTO v_free_credits, v_paid_credits
    FROM public.profiles
   WHERE id = p_user_id
     FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profile for user % not found', p_user_id;
  END IF;

  IF v_free_credits > 0 THEN
    UPDATE public.profiles
       SET free_credits = free_credits - 1
     WHERE id = p_user_id;

    v_kind_taken := 'free';
  ELSIF v_paid_credits > 0 THEN
    UPDATE public.profiles
       SET paid_credits = paid_credits - 1
     WHERE id = p_user_id;

    v_kind_taken := 'paid';
  ELSE
    RAISE EXCEPTION 'Insufficient credits';
  END IF;

  -- Append audit log entry
  INSERT INTO public.credit_log (user_id, kind, change, reason)
  VALUES (p_user_id, v_kind_taken, -1, 'job');

  RETURN v_kind_taken;
END;
$$;

-- Revoke execute from browser/public/authenticated; allow ONLY server role
REVOKE ALL ON FUNCTION public.take_credit(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.take_credit(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.take_credit(UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.take_credit(UUID) TO service_role;

-- -----------------------------------------------------------------------------
-- 9. FUNCTION: refund_credit(job_id)
--    Refunds the same credit kind exactly ONCE for a failed or cancelled job.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.refund_credit(p_job_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_job RECORD;
  v_user_id UUID;
  v_kind TEXT;
  v_already_refunded BOOLEAN;
BEGIN
  -- Fetch the target job
  SELECT id, user_id, credit_kind
    INTO v_job
    FROM public.jobs
   WHERE id = p_job_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job % not found', p_job_id;
  END IF;

  v_user_id := v_job.user_id;
  v_kind := v_job.credit_kind;

  IF v_kind IS NULL THEN
    RAISE EXCEPTION 'Job % has no credit_kind recorded to refund', p_job_id;
  END IF;

  -- Idempotency check: verify this job has not already been refunded
  SELECT EXISTS(
    SELECT 1
      FROM public.credit_log
     WHERE job_id = p_job_id
       AND reason = 'refund'
  ) INTO v_already_refunded;

  IF v_already_refunded THEN
    RAISE EXCEPTION 'Job % has already been refunded', p_job_id;
  END IF;

  -- Lock user profile
  PERFORM 1 FROM public.profiles WHERE id = v_user_id FOR UPDATE;

  -- Restore credit to corresponding bucket
  IF v_kind = 'free' THEN
    UPDATE public.profiles
       SET free_credits = free_credits + 1
     WHERE id = v_user_id;
  ELSIF v_kind = 'paid' THEN
    UPDATE public.profiles
       SET paid_credits = paid_credits + 1
     WHERE id = v_user_id;
  ELSE
    RAISE EXCEPTION 'Invalid credit kind % for job %', v_kind, p_job_id;
  END IF;

  -- Append audit log entry linking to job_id
  INSERT INTO public.credit_log (user_id, kind, change, reason, job_id)
  VALUES (v_user_id, v_kind, 1, 'refund', p_job_id);

  RETURN v_kind;
END;
$$;

-- Revoke execute from browser/public/authenticated; allow ONLY server role
REVOKE ALL ON FUNCTION public.refund_credit(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.refund_credit(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.refund_credit(UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.refund_credit(UUID) TO service_role;

-- -----------------------------------------------------------------------------
-- 10. AUTH TRIGGER: Auto-create profile with 3 free credits on signup
--     Runs automatically whenever a new user signs up in auth.users
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- 1. Create initial profile with 3 free credits
  INSERT INTO public.profiles (id, email, phone, free_credits, paid_credits)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    3,
    0
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Create the audit log record for signup (only once per user)
  IF NOT EXISTS (
    SELECT 1 FROM public.credit_log
     WHERE user_id = NEW.id AND reason = 'signup'
  ) THEN
    INSERT INTO public.credit_log (user_id, kind, change, reason)
    VALUES (NEW.id, 'free', 3, 'signup');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- End of Schema Script
-- =============================================================================
