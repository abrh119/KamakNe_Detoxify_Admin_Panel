/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  env: {
    MONGO_URI:,
    PORT: 3004,
    BASEURL: "http://localhost:3000"
  } //url for image upload to cloudinary. First copy "API base url" from Cloudinary. Then paste it here.
}
