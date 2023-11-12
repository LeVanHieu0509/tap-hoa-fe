import type { NextRequest } from "next/server";
import { NextResponse as res } from "next/server";

export const config = {
  matcher: ["/api/:path((?!auth).*)", "/backend/:path*"],
};

const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/api")) {
    const url = `${process.env.API_ENDPOINT}${pathName.replace(/^\/api/, "")}`;

    return res.rewrite(url);
  }

  if (pathName.startsWith("/backend")) {
    const url = `${process.env.API_ENDPOINT}${pathName.replace(/^\/backend/, "")}`;
    return res.rewrite(url);
  }

  return res.next();
};

export default middleware;
