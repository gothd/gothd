import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // ajuste para o domínio real

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/", // painel administrativo
          "/api/", // endpoints de API
          "/privado/", // rotas internas
          "/rascunhos/", // conteúdo de rascunho
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
