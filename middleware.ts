// import type { NextRequest } from "next/server";
import { NextRequest, NextResponse as res } from "next/server";
import { parse, stringifyUrl } from "query-string";

export const config = {
  matcher: ["/backend/:path*"],
};

const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  const query = parse(req.nextUrl.search?.replace(/^\?/, ""));

  if (pathName.startsWith("/backend")) {
    const url = `${process.env.API_ENDPOINT}${pathName.replace(/^\/backend/, "")}`;
    return res.rewrite(stringifyUrl({ url, query }));
  }

  return res.next();
};

export default middleware;
