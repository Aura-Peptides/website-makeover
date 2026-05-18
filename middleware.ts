import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE_PATTERN = /\.(?:avif|gif|ico|jpg|jpeg|png|svg|webp|css|js|map|txt|xml)$/i;

export function middleware(request: NextRequest) {
  if (process.env.COMING_SOON_ENABLED !== "true" && process.env.NEXT_PUBLIC_COMING_SOON_ENABLED !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/apple-touch-icon.png" ||
    pathname.startsWith("/icon-") ||
    PUBLIC_FILE_PATTERN.test(pathname);

  if (isPublicAsset || pathname === "/coming-soon") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  url.search = "";

  return NextResponse.rewrite(url);
}
