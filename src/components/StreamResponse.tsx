import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest
} from 'openai';
import { useOpenAPI } from '@/src/useOpenAPI';
import { useEffect } from 'react';

export default function StreamResponse() {

  const openai = useOpenAPI();

  function createChatCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

    return {
      model: MODEL,
      temperature: 0.0,
      max_tokens: 2048,
      top_p: 1,
      n: 1,
      messages: [...messages]
    }

  }

  const messages: ReadonlyArray<ChatCompletionRequestMessage> =  [
    {"role": "system", "content": SYSTEM_PROMPT.trim()},
    {
      role: 'user',
      content: `${question}\n\nExisting notes: ${Object.keys(index).join("\n")}`
    }
  ]


  const req = createChatCompletionRequest(messages)
  console.log("Executing chat: ", JSON.stringify(req, null, '  '))

  const before = Date.now()
  const res = await openai.createChatCompletion(req)


  useEffect(() => {

  }, [])


  return (
    <div>

    </div>
  )


}