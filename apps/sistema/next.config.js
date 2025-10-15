const path = require('path');
const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@ruasvivas/lib'], // garante que o Next transpile esse pacote
  webpack: (config) => {
    config.resolve.alias['@ruasvivas/ui'] = path.resolve(__dirname, '../../packages/ui');
    config.resolve.alias['@ruasvivas/assets'] = path.resolve(__dirname, '../../packages/assets');
    return config;
  },
  turbopack: {
    root: path.resolve(__dirname, "..", "..")
  }
});