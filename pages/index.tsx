import Head from 'next/head'
import {
  Box,
  LinearProgress,
  Paper,
  TextField
} from '@mui/material';
import { ChangeEvent, useCallback, useRef, useState, KeyboardEvent } from 'react';

export default function Index() {

  type Message = {
    readonly text: () => JSX.Element
  }

  const [input, setInput] = useState('')
  const inputRef = useRef('')

  const [executing,setExecuting] = useState(false)
  const [messages, setMessages] = useState<ReadonlyArray<Message>>([])
  const messagesRef = useRef<ReadonlyArray<Message>>([])


  const updateInput = useCallback((newInput: string) => {
    setInput(newInput)
    inputRef.current = newInput
  }, [])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {

      if(event.key === 'Enter') {
        // handleExecution(inputRef.current)
        updateInput('')
      }
    },
    [updateInput]
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
                const Text = message.text
                return (
                  <Box key={idx} p={1} pl={2} pr={2}>
                    <Text/>
                  </Box>
                );
              })}

            </div>

            <Box pt={1} pb={1}>

              {executing && <LinearProgress variant='indeterminate'/>}

              <Paper elevation={2}>
                <TextField placeholder="Enter a command for ChatGPT"
                           value={input} autoFocus={true} fullWidth={true} autoComplete='off' onChange={handleChange} onKeyUp={handleKeyUp}/>
              </Paper>
            </Box>

          </div>
      </main>
    </>
  )
}
