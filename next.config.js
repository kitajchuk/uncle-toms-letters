const withPreact = require("next-plugin-preact");

module.exports = withPreact({
  trailingSlash: true,
  typescript: {
    // This is okay for now while we test imaginary-dev...
    ignoreBuildErrors: true,
  },
});
