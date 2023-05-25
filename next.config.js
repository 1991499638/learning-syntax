const withMarkdoc = require('@markdoc/next.js')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')([
  'antd-mobile',
])


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  images: {
    disableStaticImages: true,
  },
  experimental: {
    // scrollRestoration: true,
  },
  serverRuntimeConfig: {
    dbConfig: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '798661926',
      database: 'user'
    },
    secret: 'Fuckruleeeeeeeeeeeeee'
  },
}
module.exports = withTM(withImages(withMarkdoc()(nextConfig)))
// module.exports = withMarkdoc()(nextConfig)
// 