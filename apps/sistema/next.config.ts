import { NextConfig } from "next/types";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  transpilePackages: ['@ruasvivas/lib'], // garante que o Next transpile esse pacote
  webpack: (config) => {
    config.resolve.alias['@ruasvivas/ui'] = resolve(__dirname, '../../packages/ui');
    config.resolve.alias['@ruasvivas/assets'] = resolve(__dirname, '../../packages/assets');
    return config;
  },
  turbopack: {
    root: resolve(__dirname, "..", "..")
  }
};

export default nextConfig;