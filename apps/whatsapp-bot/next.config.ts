const withTM = require('next-transpile-modules')([
  '@ruasvivas/lib' // garante que o Next transpile esse pacote
])

const nextConfig = withTM({
  // Evita warnings de React (já que não usamos React aqui)
  reactStrictMode: false,
  // Opcional: remove a saída de páginas
  output: 'standalone'
})

module.exports = nextConfig
