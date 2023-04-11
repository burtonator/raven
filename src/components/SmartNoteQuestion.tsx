import { LinearProgress, TextField } from '@mui/material';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState
} from 'react';
import { useStateRef } from '@/src/useStateRef';
import { useSmartNoteExecutor } from '@/src/components/useSmartNoteExecutor';

export function SmartNoteQuestion() {

  const [input, setInput, inputRef] = useStateRef('')
  const [executing, setExecuting] = useState(false)

  const smartNoteExecutor = useSmartNoteExecutor()

  const handleExecution = useCallback((question: string) => {

    async function doAsync() {
      try {
        setExecuting(true)
        const res = await smartNoteExecutor(question)
        console.log(res?.content)
      } finally {
        setExecuting(false)
      }
    }

    doAsync()
      .catch(err => console.error(err))

  }, [smartNoteExecutor]);

  const updateInput = useCallback((newInput: string) => {
    setInput(newInput)
    inputRef.current = newInput
  }, [inputRef, setInput])

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
    <>
      {executing && <LinearProgress variant='indeterminate'/>}
      <TextField placeholder="What would you like to know?... "
                 inputProps={{ autoFocus: true }}
                 value={input}
                 autoFocus={true}
                 autoComplete='off'
                 style={{width: '40em'}}
                 onChange={handleChange}
                 onKeyUp={handleKeyUp}/>
    </>
  )
}