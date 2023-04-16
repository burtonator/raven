import { useCallback, useRef, useState } from 'react';
import { Box, Button, LinearProgress, TextField } from '@mui/material';
import { useChatJSExecutor } from '@/src/components/useChatJSExecutor';

export function ChatJS() {

  const [executing, setExecuting] = useState(false)
  const chatExecutor = useChatJSExecutor()
  const [script, setScript] = useState<string| undefined>(undefined)

  const inputRef = useRef("")

  const handleExecution = useCallback((directive: string) => {

    async function doAsync() {
      setExecuting(true)
      try {
        setScript(undefined)
        const script = await chatExecutor(directive)
        console.log("Got script back: ", script?.script)
        setScript(script?.script)
      } finally {
        setExecuting(false)
      }
    }

    doAsync()
      .catch(console.error)

  }, [chatExecutor]);


  return (
    <div style={{marginLeft: 'auto'}}>
      {executing && (
        <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10000, width: '100%'}}>
          <LinearProgress variant="indeterminate"/>
        </div>
      )}

      <Box style={{display: 'flex'}} p={1} m={1}>
        <TextField style={{width: '1000px'}} onChange={evt => inputRef.current = evt.target.value} placeholder="Script to execute"/>
        <Button variant='contained' onClick={() => handleExecution(inputRef.current)}>Render</Button>
      </Box>
      {script && (
        <>
          <iframe srcDoc={`<html><head></head><body style="margin: 0; padding: 0;"><script>${script}</script></body></html>`} style={{width: '500px', height: '500px'}}></iframe>
        </>
      )}
    </div>

  )

}