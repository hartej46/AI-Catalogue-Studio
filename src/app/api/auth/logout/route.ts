import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("atelier_demo_user");

    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
