import { ChatCompletionRequestMessage } from 'openai';
import { parseSmartNoteResult } from '@/src/components/useSmartNoteExecutor';

export function promptTrainer(systemPrompt: string, userMessages: ReadonlyArray<string>) {

  const tmpl = {
    temperature: 0.0,
    max_tokens: 2048,
    top_p: 1,
    n: 1,
  }

  for (const userMessage of userMessages) {

    const messages: ReadonlyArray<ChatCompletionRequestMessage> = [
      {"role": "system", "content": systemPrompt},
      {
        role: 'user',
        content: userMessage
      }
    ]

    async function exec(model: string): Promise<string> {

      const res = await openai.createChatCompletion({
        model,
        ...tmpl,
        messages: [...messages]
      })
      console.log("Got response: ", res)
      if (res.data.choices.length > 0) {
        const first = res.data.choices[0]
        if (first.message) {
          return first.message.content
        }
      }

    }




  }

}