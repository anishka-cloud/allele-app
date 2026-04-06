import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get("season") || "True Spring";
  const slug = season.toLowerCase().replace(/\s+/g, "-");

  // Redirect to static OG image
  const url = new URL(`/og/${slug}.png`, request.url);
  return NextResponse.redirect(url, 301);
}
