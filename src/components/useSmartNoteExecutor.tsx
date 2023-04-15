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

Here's another example:

user: 
  What is cognitive dissonance?

system:
  Cognitive dissonance is a psychological concept that describes the discomfort or tension experienced by an individual when they hold two or more conflicting beliefs, values, or attitudes. This mental discomfort often leads to a motivation to resolve the inconsistency, either by changing one's beliefs, attitudes, or behaviors, or by rationalizing and justifying the inconsistency.
  
  -----
  How can cognitive dissonance be reduced?
  What are some examples of cognitive dissonance?
  What is the cognitive dissonance theory?
  Who developed the concept of cognitive dissonance?
  What are the effects of cognitive dissonance on decision-making?
  How does cognitive dissonance impact behavior?      
    
`.trim()

const MODEL = 'gpt-4'
// const MODEL = 'gpt-3.5-turbo'

export interface SmartNoteCompletion {
  readonly content: string
  readonly items: ReadonlyArray<string>
  readonly model: string
}

export function parseSmartNoteResult(text: string): SmartNoteCompletion | undefined {

  const s = text.split('-----\n')

  if (s.length === 2) {
    return {
      content: s[0],
      items: s[1].split("\n"),
      model: MODEL
    }
  }

  // either GPT3/GPT4 failed or it is not able to compute any follow-on questions.
  return {
    content: text,
    items: [],
    model: MODEL
  }

}

export function useSmartNoteExecutor() {

  const openai = useOpenAPI()

  return useCallback(async (question: string): Promise<SmartNoteCompletion | undefined> => {

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
        content: question
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
        return parseSmartNoteResult(first.message.content)
      }
    }

    return undefined

  }, [openai])

}