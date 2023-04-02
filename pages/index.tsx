import Head from 'next/head'
import {
  Box,
  LinearProgress,
  Paper,
  TextField
} from '@mui/material';
import { ChangeEvent, useCallback, useRef, useState, KeyboardEvent } from 'react';
import {
  ChatCompletionRequestMessage, Configuration,
  CreateChatCompletionRequest, OpenAIApi
} from 'openai'
import { useStateRef } from '@/src/useStateRef';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export function createCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

  return {
    model: 'gpt-3.5-turbo',
    temperature: 0.0,
    max_tokens: 256,
    top_p: 1,
    n: 1,
    messages: [...messages]
  }

}

const API_KEY_INPUTNEURON = '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'

const conf = new Configuration({
  apiKey: API_KEY_INPUTNEURON,
  // basePath: computeBrowserBasePath()
})

const openai = new OpenAIApi(conf);

export default function Index() {

  const [input, setInput] = useState('')
  const inputRef = useRef('')

  const [executing, setExecuting] = useState(false)
  const [messages, setMessages, messageRef] = useStateRef<ReadonlyArray<ChatCompletionRequestMessage>>([
    {"role": "system", "content": "You are a helpful assistant."},
  ])

  const handleExecution = useCallback((command: string) => {
    async function doAsync() {
      try {

        setMessages([
          ...messageRef.current,
          {
            role: 'user',
            content: command
          }
        ])

        setExecuting(true)

        const req = createCompletionRequest(messageRef.current)
        const before = Date.now()
        const res = await openai.createChatCompletion(req);

        if (res.data.choices.length > 0) {
          const first = res.data.choices[0]
          if (first.message) {
            setMessages([
              ...messageRef.current,
              first.message
            ])
          }
        }

        const after = Date.now()
      } finally {
        setExecuting(false)
      }
    }

    doAsync()
      .catch(err => console.error('FIXME', err))

  }, [messageRef, setMessages])

  const updateInput = useCallback((newInput: string) => {
    setInput(newInput)
    inputRef.current = newInput
  }, [])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {

      if(event.key === 'Enter') {

        if (inputRef.current.trim() !== '') {
          handleExecution(inputRef.current)
          updateInput('')
        }

      }
    },
    [handleExecution, updateInput]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      updateInput(event.currentTarget.value)
    },
    [updateInput]
  )

  return (
    <>
      <Head>
        <title>Raven</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

          <div style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '900px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>

            <div style={{flexGrow: 1, overflow: 'auto'}} id='messages'>

              {messages.map((message, idx) => {

                if (idx === 0) {
                  // ignore the system message
                  return null
                }

                return (
                  <Paper key={idx} elevation={1} sx={{mt: 1}}>
                    <Box p={1} pl={2} pr={2}>
                      {message.role === 'user' && <>{message.content}</>}
                      {message.role !== 'user' && <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{message.content}</ReactMarkdown>}
                    </Box>
                  </Paper>
                );
              })}

            </div>

            <Box pt={1} pb={1}>

              {executing && <LinearProgress variant='indeterminate'/>}

              <Paper elevation={2}>
                <TextField placeholder="Enter a command for ChatGPT"
                           inputProps={{ autoFocus: true }}
                           value={input} autoFocus={true} fullWidth={true} autoComplete='off' onChange={handleChange} onKeyUp={handleKeyUp}/>
              </Paper>
            </Box>

          </div>
      </main>
    </>
  )
}

function scrollMessagesIntoView() {
  const messagesElement = document.getElementById('messages')

  if (messagesElement) {
    if (messagesElement.lastElementChild) {
      messagesElement.lastElementChild.scrollIntoView({block: 'end'})
    }
  }
}
