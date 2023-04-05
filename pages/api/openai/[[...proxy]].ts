import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'


// turn off default parser for current route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (! OPENAI_API_KEY) {
    throw new Error("No OPENAI_API_KEY")
  }

  return httpProxyMiddleware(req, res, {
    target: 'https://api.openai.com',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    pathRewrite: [
      {
        patternStr: '^/api/openai/proxy/',
        replaceStr: '/v1/',
      }
    ],
    debug: true,
    logLevel: 'debug',
    auth: () => OPENAI_API_KEY,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
      // Log outbound request to remote target
      console.log('-->  ', req.method, req.path, '->', proxyReq.path);
    },
  })
}
