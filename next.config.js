const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  /** @type {import('next').NextConfig} */
  return {
    // Keep dev and production outputs separate so build artifacts do not
    // leave the dev server with stale chunk references.
    distDir: isDevServer ? ".next-dev" : ".next",
    reactStrictMode: true,
    // Keep more routes warm in development so switching between pages
    // does not trigger as many recompilations while you are working.
    onDemandEntries: {
      maxInactiveAge: 15 * 60 * 1000,
      pagesBufferLength: 20,
    },
    images: {
      domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "images.unsplash.com"],
      formats: ["image/avif", "image/webp"],
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ],
        },
      ];
    },
  };
};
