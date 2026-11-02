import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, token } = body;
    const cookieStore = await cookies();

    // 1. Instant Demo Bypass
    if (action === "demo-bypass") {
      const demoEmail = email && email.includes("@") ? email.trim() : "vedrai0091@gmail.com";
      cookieStore.set("atelier_demo_user", demoEmail, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        httpOnly: false,
      });

      return NextResponse.json({
        success: true,
        message: "Instant atelier access granted.",
        isDemo: true,
      });
    }

    // 2. Send OTP
    if (action === "send") {
      if (!email || !email.includes("@")) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid boutique or merchant email address." },
          { status: 400 }
        );
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json({
          success: true,
          isDemo: true,
          message: "Demo mode active: use passkey 123456 to log in.",
        });
      }

      try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            shouldCreateUser: true,
          },
        });

        if (error) {
          console.warn("Supabase signInWithOtp error:", error.message);
          // If rate limit reached or provider issue, allow graceful test passkey
          return NextResponse.json({
            success: true,
            warning: error.message,
            message:
              error.message.includes("rate") || error.message.includes("security")
                ? "Supabase email rate limit reached. You can enter passkey 123456 to continue immediately."
                : error.message,
            demoPasskeyHint: true,
          });
        }

        return NextResponse.json({
          success: true,
          message: `Verification code sent to ${email}. (Please check your Spam / Promotions folder if not in inbox)`,
          demoPasskeyHint: true,
        });
      } catch (err: any) {
        console.error("Supabase client error:", err);
        return NextResponse.json({
          success: true,
          isDemo: true,
          message: "Supabase connection unavailable. Enter passkey 123456 to log in.",
          demoPasskeyHint: true,
        });
      }
    }

    // 3. Verify OTP
    if (action === "verify") {
      if (!token || token.length < 6) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid 6-digit passkey." },
          { status: 400 }
        );
      }

      // Universal instant dev & demo passkey
      if (token === "123456" || token === "000000") {
        const activeEmail = email && email.includes("@") ? email.trim() : "vedrai0091@gmail.com";
        cookieStore.set("atelier_demo_user", activeEmail, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          httpOnly: false,
        });

        return NextResponse.json({
          success: true,
          isDemo: true,
          message: "Passkey verified successfully.",
        });
      }

      // Verify via Supabase
      try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: token.trim(),
          type: "email",
        });

        if (error) {
          return NextResponse.json({
            success: false,
            error: error.message || "Invalid passkey. You may also use 123456 for instant access.",
          });
        }

        return NextResponse.json({
          success: true,
          user: data.user,
        });
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: err?.message || "Verification failed. Try passkey 123456.",
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Unsupported action." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Auth OTP route error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
