import Head from 'next/head'
import {
  AppBar,
  Box,
  LinearProgress,
  Paper,
  TextField, Toolbar, Typography
} from '@mui/material';
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  KeyboardEvent,
  useEffect
} from 'react';
import {
  ChatCompletionRequestMessage,
  Configuration, CreateChatCompletionRequest,
  OpenAIApi
} from 'openai'
import { useStateRef } from '@/src/useStateRef';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { WhisperControl } from '@/pages/whisper';

export function createCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

  return {
    model: 'gpt-3.5-turbo',
    temperature: 0.0,
    max_tokens: 256,
    top_p: 1,
    n: 1,
    messages: messages.map(current => {
      const cpy = {...current}
      delete cpy['duration']
      delete cpy['audioContent']
      return cpy
    })
  }

}

const API_KEY_INPUTNEURON = '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'

const conf = new Configuration({
  apiKey: API_KEY_INPUTNEURON,
  // basePath: computeBrowserBasePath()
})

const openai = new OpenAIApi(conf);

export type ChatCompletionRequestMessageWithDuration = {
  readonly duration?: number
  readonly audioContent?: string

} & ChatCompletionRequestMessage

interface AudioMessage {
  readonly audioContent: string
}

async function convertToSpeech(text: string): Promise<AudioMessage> {

  if (! text) {
    throw new Error("No text given")
  }

  const res = await fetch('/api/google_cloudspeech', {
    headers: {
      ContentType: 'text/json'
    },
    method: 'POST',
    body: JSON.stringify({text})
  })

  return await res.json()

}

export default function Index() {

  const [input, setInput] = useState('')
  const inputRef = useRef('')

  const audioElementRef = useRef<HTMLAudioElement | undefined>(undefined)

  // needed when we need to remount WhisperControl as it seems to get confused
  // and keep emitting the same transcript
  const [whisperKey, setWhisperKey, whisperKeyRef] = useStateRef(0)

  const [executing, setExecuting] = useState(false)
  const [recording, setRecording] = useState(false)
  const [messages, setMessages, messageRef] = useStateRef<ReadonlyArray<ChatCompletionRequestMessageWithDuration>>([
    {"role": "system", "content": "You are a helpful assistant.  Limit all responses to one paragraph maximum but make them as brief as possible unless asked otherwise. Your goal is to explain things to children from 7-10 years old.  Do not discuss sensitive topics like sex or violence without parental consent.  Do not repeat the same thing if when asked additional questions.  Don't ever generate the same answer."},
  ])

  const stopPlayingAudio = useCallback(() => {

    if (audioElementRef.current) {
      audioElementRef.current.pause()
    } else {
      console.warn('no audio element')
    }

  }, [])

  const handleExecution = useCallback((command: string) => {

    console.log("Got command: " + command)

    async function doAsync() {
      try {

        stopPlayingAudio()
        setExecuting(true)

        setMessages([
          ...messageRef.current,
          {
            role: 'user',
            content: command
          }
        ])

        const req = createCompletionRequest(messageRef.current)
        const before = Date.now()
        const completion = openai.createChatCompletion(req)
        const res = await completion
        const after = Date.now()
        const duration = after - before


        if (res.data.choices.length > 0) {
          const first = res.data.choices[0]
          if (first.message) {

            const audio = await convertToSpeech(first.message.content)

            setMessages([
              ...messageRef.current,
              {
                ...first.message,
                duration,
                audioContent: audio.audioContent
              }
            ])
          }
        }

      } finally {
        setWhisperKey(whisperKeyRef.current + 1)
        setExecuting(false)
      }
    }

    doAsync()
      // FIXME properly handle errors in the UI...
      .catch(err => console.error('Unhandled error', err))

  }, [messageRef, setMessages, setWhisperKey, stopPlayingAudio, whisperKeyRef])

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

  const handleWhisper = useCallback((text: string) => {

    handleExecution(text)

  }, [handleExecution])

  useEffect(() => {
    // make sure messages always scroll into view...
    scrollMessagesIntoView()
  }, [messages])

  return (
    <>
      <Head>
        <title>Raven</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Raven
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{
            paddingTop: '64px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '900px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>

            <div style={{flexGrow: 1, overflow: 'auto', padding: '8px'}} id='messages'>

              {messages.map((message, idx) => {

                if (idx === 0) {
                  // ignore the system message
                  return null
                }

                return (
                  <React.Fragment key={idx}>
                    <Paper elevation={1} sx={{mt: 1}}>
                      <Box p={1} pl={2} pr={2}>
                        {message.role === 'user' && <>{message.content}</>}
                        {message.role !== 'user' && <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{message.content}</ReactMarkdown>}

                      </Box>
                    </Paper>
                    {message.duration && (
                      <Box style={{textAlign: 'right', fontSize: '14px'}} color='text.disabled'>
                        duration: {message.duration}
                      </Box>
                    )}

                    {message.audioContent && (
                      <audio autoPlay="autoplay"
                             onPlay={event => {
                               console.log("Playing has started", event.currentTarget);
                               audioElementRef.current = event.currentTarget
                             }}
                             controls={true}
                             src={`data:audio/mp3;base64,${message.audioContent}`}
                             />
                      )}

                  </React.Fragment>
                );
              })}

              <Box style={{textAlign: 'center'}} mt={1} mb={1}>
                <WhisperControl key={whisperKey}
                                disabled={executing}
                                onStartRecording={() => {
                                  stopPlayingAudio()
                                  setRecording(true)
                                  scrollMessagesIntoView()
                                }}
                                onStopRecording={() => {
                                  setRecording(false)
                                }}
                                onTranscription={text => {
                                  handleWhisper(text);
                                }}/>
              </Box>

            </div>

            <Box pt={1} pb={1}>

              {(executing || recording) && <LinearProgress variant='indeterminate'/>}

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
      messagesElement.lastElementChild.scrollIntoView()
    }
  }
}
