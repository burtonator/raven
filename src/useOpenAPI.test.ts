import {
  ChatCompletionRequestMessage, Configuration,
  CreateChatCompletionRequest,
  OpenAIApi
} from 'openai';


function createSystemPrompt(format: string) {
  return `
You are a code generator. The user describes a data structure and you generate the output in ${format}.

You will ONLY generate ${format} output. for the given input. 

`.trim()

}

const TIMEOUT = 120000

xdescribe('useOpenAI', function() {

  async function doTest(format: string) {

    const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_API_KEY}))

    function createChatRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

      return {
        model: 'gpt-4',
        temperature: 0.0,
        max_tokens: 4096,
        top_p: 1,
        n: 1,
        messages: [...messages]
      }

    }



    const messages: ReadonlyArray<ChatCompletionRequestMessage> = [
      {"role": "system", "content": createSystemPrompt(format).trim()},
      {
        role: 'user',
        content: "Create a dictionary with 20 keys, 0-19, where both the key and value are the number."
      }
    ]


    const req = createChatRequest(messages)
    // console.log("Executing chat: ", JSON.stringify(req, null, '  '))

    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()

    const duration = after-before
    console.log('duration: ', duration)

  }

  it('JSON', async () => {
    await doTest('JSON')
  }, TIMEOUT);

  it('YAML', async () => {
    await doTest('YAML')
  }, TIMEOUT);

})