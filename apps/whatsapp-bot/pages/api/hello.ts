// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  description: string
  imageUrl: string
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(200)
    .json({
      name: 'Göst',
      description: 'Eu sou um gatinho, e durmo na roupa do chefe.',
      imageUrl: `${
        process.env.VERCEL_URL ?? 'http://localhost:3000'
      }/20251014.jpg`
    })
}
