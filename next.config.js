module.exports = {
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  reactStrictMode: false,
  basePath: "",
  env: {
    basePath: "",
  },
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },

  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: "/backend/:path*",
  //         destination: `${process.env.API_ENDPOINT}/:path*`,
  //       },
  //     ],
  //   };
  // },
};
