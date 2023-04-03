import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default function handler(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {

  return httpProxyMiddleware(req, res, {
    target: 'https://api.openai.com',
    pathRewrite: {
      '^/api/openai/proxy/': '/v1/',
    },
  })
}
