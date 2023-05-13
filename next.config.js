/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "@yanglee2421/scss/src" as *;`,
  },
};

module.exports = nextConfig;
