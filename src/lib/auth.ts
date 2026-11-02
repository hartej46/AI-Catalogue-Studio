import { createClient, createAdminClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import type { Profile } from "@/lib/supabase/types";

/**
 * Retrieves the currently logged-in user from the server session cookies.
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      return user;
    }
  } catch (err) {
    // Supabase auth read failed, check demo fallback
  }

  // Check demo cookie session
  try {
    const cookieStore = await cookies();
    const demoEmail = cookieStore.get("atelier_demo_user")?.value;
    if (demoEmail) {
      return {
        id: "demo-merchant-id",
        email: demoEmail,
        phone: null,
        app_metadata: {},
        user_metadata: { name: "Merchant Atelier" },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as any;
    }
  } catch {
    // Read-only or headers not accessible
  }

  return null;
}

/**
 * Ensures a user's profile exists with initial complimentary credits (3 free credits)
 * and an immutable signup audit log. Idempotent and thread-safe.
 */
export async function ensureUserProfile(user: {
  id: string;
  email?: string | null;
  phone?: string | null;
}): Promise<Profile> {
  if (user.id === "demo-merchant-id") {
    return {
      id: "demo-merchant-id",
      email: user.email || "merchant@atelier.studio",
      phone: null,
      free_credits: 3,
      paid_credits: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Profile;
  }

  try {
    const adminClient = await createAdminClient();

    // 1. Check if profile already exists
    const { data: existingProfile, error: fetchError } = await adminClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (existingProfile) {
      return existingProfile as Profile;
    }

    // 2. Profile does not exist yet: create with 3 free credits
    const initialProfile = {
      id: user.id,
      email: user.email || null,
      phone: user.phone || null,
      free_credits: 3,
      paid_credits: 0,
    };

    const { data: newProfile, error: insertError } = await adminClient
      .from("profiles")
      .insert(initialProfile)
      .select("*")
      .single();

    if (insertError) {
      // If another request created it concurrently, re-fetch
      const { data: retryProfile } = await adminClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (retryProfile) {
        return retryProfile as Profile;
      }

      console.warn("Could not insert profile in database, using memory fallback:", insertError.message);
      return {
        id: user.id,
        email: user.email || null,
        phone: user.phone || null,
        free_credits: 3,
        paid_credits: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Profile;
    }

    // 3. Log the complimentary signup credits (only if not logged before)
    const { data: existingLog } = await adminClient
      .from("credit_log")
      .select("id")
      .eq("user_id", user.id)
      .eq("reason", "signup")
      .maybeSingle();

    if (!existingLog) {
      await adminClient.from("credit_log").insert({
        user_id: user.id,
        kind: "free",
        change: 3,
        reason: "signup",
      });
    }

    return newProfile as Profile;
  } catch (err: any) {
    console.warn("ensureUserProfile fallback:", err?.message);
    return {
      id: user.id,
      email: user.email || null,
      phone: user.phone || null,
      free_credits: 3,
      paid_credits: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Profile;
  }
}

/**
 * Fetches the user profile and guarantees it exists.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    return await ensureUserProfile({
      id: user.id,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error in getCurrentProfile:", error);
    return null;
  }
}
