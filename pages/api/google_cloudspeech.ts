import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const API_KEY = 'AIzaSyD2XKioI72J7eSgUDhwQeyHtmdaJ9xQ-kQ'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const req_json = JSON.parse(req.body)
  const text = req_json.text

  if (! text) {
    throw new Error("No text")
  }

  const response = await fetch(`https://content-texttospeech.googleapis.com/v1/text:synthesize?alt=json&key=${API_KEY}`, {
    headers: {
      //Authorization: 'Bearer ya29.a0Ael9sCNMbfKPwnAhZzcMGk1HOAPU-Xl1B0dG_GzIlDNvuBqOveomfjo68Q96Xep85WDaQPjQ1tsJ843U_7_nBkpuzzfvCb3-ySBkvrCpYLBmsZfyAfGUUJtnZwpL8o7eIi1Y7WNQEPpJ0SCdDdE76dEVKb3MvK9-YAaCgYKAUQSAQ8SFQF4udJh7X9mj3E3QiZvlb_bgXIoRA0169',
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
