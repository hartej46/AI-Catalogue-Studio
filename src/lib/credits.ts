import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Deducts 1 credit from user profile.
 * If requirePaid is true: strictly deducts 1 paid credit (throws if paid_credits < 1).
 * Otherwise: deducts free credit first, else paid credit.
 */
export async function deductUserCredit(
  adminClient: SupabaseClient<any, "public", any>,
  userId: string,
  requirePaid: boolean = false
): Promise<"free" | "paid"> {
  // If demo user
  if (userId === "demo-merchant-id") {
    return requirePaid ? "paid" : "free";
  }

  // 1. Fetch current balances with row lock
  const { data: profile, error: profileErr } = await adminClient
    .from("profiles")
    .select("free_credits, paid_credits")
    .eq("id", userId)
    .single();

  if (profileErr || !profile) {
    throw new Error(`Profile for user ${userId} not found.`);
  }

  const freeCredits = profile.free_credits || 0;
  const paidCredits = profile.paid_credits || 0;

  if (requirePaid) {
    if (paidCredits < 1) {
      throw new Error("Insufficient paid credits. Please purchase credits to recreate in 4K.");
    }

    const { error: updateErr } = await adminClient
      .from("profiles")
      .update({ paid_credits: paidCredits - 1 })
      .eq("id", userId);

    if (updateErr) throw updateErr;

    await adminClient.from("credit_log").insert({
      user_id: userId,
      kind: "paid",
      change: -1,
      reason: "job",
    });

    return "paid";
  }

  // Normal flow: free credit first, then paid
  if (freeCredits > 0) {
    const { error: updateErr } = await adminClient
      .from("profiles")
      .update({ free_credits: freeCredits - 1 })
      .eq("id", userId);

    if (updateErr) throw updateErr;

    await adminClient.from("credit_log").insert({
      user_id: userId,
      kind: "free",
      change: -1,
      reason: "job",
    });

    return "free";
  } else if (paidCredits > 0) {
    const { error: updateErr } = await adminClient
      .from("profiles")
      .update({ paid_credits: paidCredits - 1 })
      .eq("id", userId);

    if (updateErr) throw updateErr;

    await adminClient.from("credit_log").insert({
      user_id: userId,
      kind: "paid",
      change: -1,
      reason: "job",
    });

    return "paid";
  } else {
    throw new Error("You have no credits left");
  }
}
