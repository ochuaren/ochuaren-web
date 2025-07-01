/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ["en-US"],
  //   defaultLocale: "en-US",
  // },
  experimental: {
    isrMemoryCacheSize: process.env.NODE_ENV === "production" ? 500_000_000 : 0,
  },
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      "placehold.co",
      "192.168.1.83",
      "upload.wikimedia.org",
      "ochuar-publi-6dkfefvdgr1k-1019427656.us-east-1.elb.amazonaws.com",
      "ochuaren-production.s3.amazonaws.com",
    ],
  },
  //   async rewrites() {
  //   return [
  //     {
  //       source: "/uploads/:path*",
  //       destination: "https://seal-app-tqbmk.ondigitalocean.app/uploads/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
