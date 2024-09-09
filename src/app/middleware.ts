import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = auth((req) => {
  console.info("middleware");
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

/*export default function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/login')) {
    const newUrl = new URL("/login", request.url);
    return NextResponse.rewrite(newUrl);
  }
}*/

