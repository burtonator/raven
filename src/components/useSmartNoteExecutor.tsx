import { useCallback } from 'react';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest, CreateChatCompletionResponse
} from 'openai';
import { useOpenAPI } from '@/src/useOpenAPI';

const SYSTEM_PROMPT = `
You are a research assistant. Your job is to answer the users questions. 

After you generate the answer to a question you must then generate a list of 
additional/followup questions the user is likely to ask next.

For example, a list of questions might look like the following:

    -----
    What is the time complexity of retrieving a value from a Hashtable?
    How does a Hashtable handle collisions?
    What is the difference between Hashtable and HashMap?
    When should you use a Hashtable instead of a HashMap?
    Is Hashtable thread-safe?

The list of questions must begin with "----" then list the questions after.
    
You should have one question per line and do not order the questions.  Just 
present them one after the other.
    
`.trim()

// const MODEL = 'gpt-4'
const MODEL = 'gpt-3.5-turbo'

export interface SmartNoteCompletion {
  readonly content: string
  readonly items: ReadonlyArray<string>
}

export function parseSmartNoteResult(text: string): SmartNoteCompletion | undefined {

  const s = text.split('-----\n')

  if (s.length === 2) {
    return {
      content: s[0],
      items: s[1].split("\n")
    }
  }

  return undefined

}

export function useSmartNoteExecutor() {

  const openai = useOpenAPI()

  return useCallback(async (question: string): Promise<SmartNoteCompletion | undefined> => {

    function createChatRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

      return {
        // model: 'gpt-4',
        // model: 'gpt-3.5-turbo',
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
        content: question
      }
    ]


    const req = createChatRequest(messages)
    console.log("Executing chat: ", JSON.stringify(req, null, '  '))

    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()
    const duration = after - before
    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        return parseSmartNoteResult(first.message.content)
      }
    }

    return undefined

  }, [openai])

}