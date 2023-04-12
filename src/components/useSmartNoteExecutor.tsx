import { useCallback } from 'react';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest, CreateChatCompletionResponse
} from 'openai';
import { useOpenAPI } from '@/src/components/useOpenAPI';
import { AxiosResponse } from 'axios';

const SYSTEM_PROMPT = `
You are a helpful research assistant. Your job is to answer the users questions of if they give you a topic you just expand upon it.

After you are complete you should end with "----" then provide a list of follow up questions the user might want to know based on the answer to the question.  You should have one question per line and do not order the questions.  Just present them one after the other.

For example, a list of questions might look like the following:

----
What is the time complexity of retrieving a value from a Hashtable?
How does a Hashtable handle collisions?
What is the difference between Hashtable and HashMap?
When should you use a Hashtable instead of a HashMap?
Is Hashtable thread-safe?
`.trim()

export interface SmartNoteCompletion {
  readonly content: string
}

export function useSmartNoteExecutor() {

  const openai = useOpenAPI()

  return useCallback(async (question: string): Promise<SmartNoteCompletion | undefined> => {

    function createCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

      return {
        // model: 'gpt-4',
        model: 'gpt-3.5-turbo',
        temperature: 0.0,
        max_tokens: 2045,
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

    const req = createCompletionRequest(messages)
    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()
    const duration = after - before
    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        return {content: first.message.content}
      }
    }

    return undefined

  }, [openai])

}