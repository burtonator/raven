import { Box, Grid, Paper, TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { useStateRef } from '@/src/useStateRef';
import { useAutoUIChatExecutor } from '@/src/components/useAutoUIChatExecutor';

interface AutoUIChatProps {
  readonly onCode: (code: string, type: 'yaml') => void
  readonly onExecuting: (executing: boolean) => void
}

export default function AutoUIChat(props :AutoUIChatProps) {

  const {onCode, onExecuting} = props
  const [input, setInput, inputRef] = useStateRef('')
  const autoUIChatExecutor = useAutoUIChatExecutor();

  const updateInput = useCallback((newInput: string) => {
    setInput(newInput)
    inputRef.current = newInput
  }, [inputRef, setInput])

  const handleExecution = useCallback((directive: string) => {

    async function doAsync() {

      try {

        console.log("starting execution")
        onExecuting(true)
        const execution = await autoUIChatExecutor(directive)

        console.log("Got execution: ", execution)

        if (execution) {
          onCode(execution.code, 'yaml')
        }

      } finally {
        onExecuting(false)
      }

    }

    doAsync().catch(console.error)

  }, [autoUIChatExecutor, onCode, onExecuting]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {

      if(event.key === 'Enter') {

        if (inputRef.current.trim() !== '') {
          handleExecution(inputRef.current)
          updateInput('')
        }

      }
    },
    [handleExecution, inputRef, updateInput]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      updateInput(event.currentTarget.value)
    },
    [updateInput]
  )


  return (
    <Paper
      elevation={3}
      style={{position: 'absolute', right: 10, bottom: 10, width: '400px', height: '500px', display: 'flex', flexDirection: "column"}}
    >

      <Grid container spacing={2}
            direction="column"
            justifyContent="flex-end">

        <Grid item xs={12}>
          <TextField fullWidth={true}
                     placeholder="Describe the page or content you would like generated"
                     onChange={handleChange}
                     onKeyUp={handleKeyUp}
                     autoComplete="off"/>
        </Grid>

      </Grid>

    </Paper>
  )

}