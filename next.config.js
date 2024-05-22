/** @type {import('next').NextConfig} */



module.exports = {
  /* async redirects() {
    return [
      {
        source: '/:slug',
        destination: '/:slug', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  }, */
  reactStrictMode: false,
  trailingSlash: true,
}

// Inected Content via Sentry Wizard Below

/* const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "fysi",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
); */
