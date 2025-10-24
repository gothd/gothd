// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  description: string;
  imageUrl: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const isProd = process.env.NODE_ENV === "production";
  const protocol = isProd ? "https" : "http"; // assume que você está usando https em produção
  const host = req.headers.host;
  const fullUrl = `${protocol}://${host}`;

  res.status(200).json({
    name: "Göst",
    description: "Eu sou um gatinho, e durmo na roupa do chefe.",
    imageUrl: `${fullUrl}/20251014.jpg`,
  });
}
