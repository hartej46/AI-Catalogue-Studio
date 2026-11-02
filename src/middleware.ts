import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Protected paths as requested: /studio, /lookbook, /credits, /atelier
  const isProtectedPath =
    pathname.startsWith("/studio") ||
    pathname.startsWith("/lookbook") ||
    pathname.startsWith("/credits") ||
    pathname.startsWith("/atelier");

  // If Supabase credentials are missing, redirect protected routes to /login
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.trim() === "") {
    if (isProtectedPath) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // Create Supabase SSR client for session check and cookie refresh
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const demoCookie = request.cookies.get("atelier_demo_user");
  const isAuthenticated = Boolean(user || demoCookie?.value);

  // If path is protected and user is not signed in -> redirect to /login
  if (isProtectedPath && !isAuthenticated) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is already signed in and visits /login -> redirect to studio or redirectTo target
  if (pathname === "/login" && isAuthenticated) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/studio/jewellery";
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = redirectTo.startsWith("/") ? redirectTo : "/studio/jewellery";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|styles|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
