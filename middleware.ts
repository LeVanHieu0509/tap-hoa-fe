// import type { NextRequest } from "next/server";
import { NextRequest, NextResponse as res } from "next/server";
import { parse, stringifyUrl } from "query-string";

export const config = {
  matcher: ["/backend/:path*"],
};

const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/backend")) {
    const redirect = stringifyUrl({
      url: `${process.env.API_ENDPOINT}${pathName.replace(/^\/backend/, "")}`,
      query: parse(req.nextUrl.search?.replace("?", "")),
    });

    return res.rewrite(redirect);
  }

  return res.next();
};

export default middleware;
