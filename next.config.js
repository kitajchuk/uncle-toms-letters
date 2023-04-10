// @ts-check

const withPreact = require("next-plugin-preact");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withPreact({
  trailingSlash: true,
  typescript: {},
});

module.exports = nextConfig;
