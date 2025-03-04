import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/sesion";

const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  try {
    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);
    console.log(session);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
