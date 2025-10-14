/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desabilita a geração de páginas estáticas/SSR
  // Mantém apenas as rotas de API
  experimental: {
    appDir: false // garante que não use a pasta /app
  },
  // Evita warnings de React (já que não usamos React aqui)
  reactStrictMode: false,
  // Opcional: remove a saída de páginas
  output: 'standalone'
}

module.exports = nextConfig
