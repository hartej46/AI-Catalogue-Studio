import { NextResponse } from "next/server";
import { getCurrentUser, ensureUserProfile } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const profile = await ensureUserProfile({
      id: user.id,
      email: user.email,
      phone: user.phone,
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
      profile: {
        id: profile.id,
        email: profile.email,
        phone: profile.phone,
        free_credits: profile.free_credits,
        paid_credits: profile.paid_credits,
        total_credits: profile.free_credits + profile.paid_credits,
      },
    });
  } catch (error: any) {
    console.error("Failed to load user profile:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
