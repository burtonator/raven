import { useCallback } from 'react';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest
} from 'openai';
import { useOpenAPI } from '@/src/useOpenAPI';

const SYSTEM_PROMPT = `
You are a helpful assistant.

I'm going to give you a list of topics.  They will be given to you as one topic per line.

The topics may either be a question or a statement.

Your job is to cluster the topics together hierarchically.

You will render them as a tree.

You MUST include every topic in the output.  This is very important.

It is acceptable that a topic might be present in multiple clusters.

Make sure to include subcategories and specific topics under each main category.

It's important to note that a topic might exist in multiple categories when appropriate.

The resulting output should be in YAML and each level of indentation should use 4 spaces per indentation level.

Here are some examples:

# Example 1:

# Here is the Input:

What is WWII?
What happened to Germany after WWII?
What is Gradient Descent?
What is Artificial Intelligence, and how does it differ from other fields of computer science?
What are the different types of AI, and how do they work?
What are the applications of AI in different industries, such as healthcare, finance, and manufacturing?
How does AI learn, and what are the different approaches to machine learning, such as supervised, unsupervised, and reinforcement learning?
How can bias be avoided in AI systems, and what are the ethical implications of AI?
What were the main causes of WWII, and how did it differ from WWI?
What were the major military campaigns and battles of WWII, and how did they shape the outcome of the war?
What was the role of propaganda in WWII, and how did it influence public opinion and support for the war?

# Here is the Output

---
World Wars:
    World War II:
        items: 
            What is WWII?:
            Military history of the United States during World War II:
            What happened to Germany after WWII?:
            What were the main causes of WWII, and how did it differ from WWI?:
            What were the major military campaigns and battles of WWII, and how did they shape the outcome of the war?:
            What was the role of propaganda in WWII, and how did it influence public opinion and support for the war?:
Artificial Intelligence:
    items: 
        What is Gradient Descent?:
        What is Artificial Intelligence, and how does it differ from other fields of computer science?:
        What are the different types of AI, and how do they work?:
        What are the applications of AI in different industries, such as healthcare, finance, and manufacturing?:
        How does AI learn, and what are the different approaches to machine learning, such as supervised, unsupervised, and reinforcement learning?:
        How can bias be avoided in AI systems, and what are the ethical implications of AI?:
    
`.trim()

const MODEL = 'gpt-4'
// const MODEL = 'gpt-3.5-turbo'

export interface SmartNoteCompletion {
  readonly content: string
  readonly model: string
}


export function useSmartNoteGraphCalculator() {

  const openai = useOpenAPI()

  return useCallback(async (notes: ReadonlyArray<string>): Promise<SmartNoteCompletion | undefined> => {

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
        content: notes.join("\n")
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
        return first.message.content
      }
    }

    return undefined

  }, [openai])

}