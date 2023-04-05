import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const API_KEY = process.env.GOOGLE_TTS_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const req_json = JSON.parse(req.body)
  const text = req_json.text

  if (! API_KEY) {
    throw new Error("No GOOGLE_TTS_API_KEY")
  }

  if (! text) {
    throw new Error("No text")
  }

  const response = await fetch(`https://content-texttospeech.googleapis.com/v1/text:synthesize?alt=json&key=${API_KEY}`, {
    headers: {
      ContentType: 'text/json'
    },
    method: 'POST',
    referrer: '',
    mode: 'no-cors',
    body: JSON.stringify({
      input: {
        text
      },
      audioConfig: {
        "audioEncoding":"MP3",
        speakingRate: '1.35'
      },
      "voice": {
        "languageCode":"en"
      }
    })
  })

  const json = await response.json()
  res.json(json)

}
