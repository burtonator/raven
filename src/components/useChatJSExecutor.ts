import { useCallback } from 'react';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest, CreateChatCompletionResponse
} from 'openai';
import { useOpenAPI } from '../useOpenAPI';

const SYSTEM_PROMPT = `
You will act as a software engineer. Your job is to write code.

You will emit javascript and javascript only. 

Do not describe your work. 

You will only emit Javascript.

You can access the DOM and standard browsers only.

You can target browsers release since the year 2021. 

The iframe width is 500px.  It's height is 500px.

Your visualization should take up the entire space.

DO NOT emit HTML or a wrapper HTML. Only emit pure Javascript code.

You are also projecting on a black background so adjust your colors.

`.trim()

const MODEL = 'gpt-4'
// const MODEL = 'gpt-3.5-turbo'

export interface ScriptCompletion {
  readonly script: string
}


export function useChatJSExecutor() {

  const openai = useOpenAPI()

  function parseResult(text: string) {

    const START_JS = '```javascript'
    const END_JS = '```'

    if (text.startsWith(START_JS)) {
      const script = text.substring(START_JS.length, text.length - END_JS.length - 1)
      return {script}
    }

    return {script: text}
  }

  return useCallback(async (directive: string): Promise<ScriptCompletion | undefined> => {

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

    const messages: ReadonlyArray<ChatCompletionRequestMessage> = [
      {"role": "system", "content": SYSTEM_PROMPT.trim()},
      {
        role: 'user',
        content: directive
      }
    ]


    const req = createChatCompletionRequest(messages)
    console.log("Executing chat: ", JSON.stringify(req, null, '  '))

    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()
    const duration = after - before
    console.log("Got response: ", res)
    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        return parseResult(first.message.content)
      }
    }

    return undefined

  }, [openai])

}