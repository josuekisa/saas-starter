import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const code = searchParams.get("code");

  if (code) {
    const response = NextResponse.redirect(`${siteUrl}/dashboard`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("[callback] exchangeCodeForSession error:", error);
    if (!error) {
      return response;
    }
    return NextResponse.redirect(`${siteUrl}/login?error=${error.message}`);
  }

  console.log("[callback] no code in URL");
  return NextResponse.redirect(`${siteUrl}/login?error=no_code`);
}
