/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ruasvivas/lib'], // garante que o Next transpile esse pacote
  // Evita warnings de React (já que não usamos React aqui)
  reactStrictMode: false,
  // Opcional: remove a saída de páginas
  output: 'standalone'
}

module.exports = nextConfig
