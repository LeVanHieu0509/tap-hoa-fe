import type { NextRequest } from "next/server";
import { NextResponse as res } from "next/server";

export const config = {
  matcher: ["/backend/:path*"],
};

const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/backend")) {
    const url = `${process.env.API_ENDPOINT}${pathName.replace(/^\/backend/, "")}`;

    return res.rewrite(url);
  }

  return res.next();
};

export default middleware;
