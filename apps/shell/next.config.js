const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias['@ruasvivas/ui'] = path.resolve(__dirname, '../../packages/ui');
    config.resolve.alias['@ruasvivas/assets'] = path.resolve(__dirname, '../../packages/assets');
    return config;
  },
  turbopack: {
    root: path.resolve(__dirname, "..", "..")
  }
};