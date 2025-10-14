const path = require('path');
const withMDX = require('@next/mdx')();
const withTM = require("next-transpile-modules")([
  "@ruasvivas/lib" // garante que o Next transpile esse pacote
]);

const nextConfigWithMDX = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => {
    config.resolve.alias['@ruasvivas/ui'] = path.resolve(__dirname, '../../packages/ui');
    config.resolve.alias['@ruasvivas/assets'] = path.resolve(__dirname, '../../packages/assets');
    return config;
  },
  turbopack: {
    root: path.resolve(__dirname, "..", "..")
  }
});

module.exports = withTM(nextConfigWithMDX);