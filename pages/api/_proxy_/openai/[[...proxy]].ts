import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default function handler(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (! OPENAI_API_KEY) {
    throw new Error("No OPENAI_API_KEY")
  }

  return httpProxyMiddleware(req, res, {
    target: 'https://api.openai.com',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    pathRewrite: {
      '^/api/openai/proxy/': '/v1/',
    },
  })
}
