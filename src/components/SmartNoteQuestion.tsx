import { TextField } from '@mui/material';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState
} from 'react';
import { useStateRef } from '@/src/useStateRef';

export function SmartNoteQuestion() {

  const [input, setInput, inputRef] = useStateRef('')

  const updateInput = useCallback((newInput: string) => {
    setInput(newInput)
    inputRef.current = newInput
  }, [inputRef, setInput])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {

      if(event.key === 'Enter') {

        if (inputRef.current.trim() !== '') {
          // handleExecution(inputRef.current)
          updateInput('')
        }

      }
    },
    [inputRef, updateInput]
  )


  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      updateInput(event.currentTarget.value)
    },
    [updateInput]
  )

  return (
    <TextField placeholder="What would you like to know?... "
               inputProps={{ autoFocus: true }}
               value={input}
               autoFocus={true}
               autoComplete='off'
               style={{width: '40em'}}
               onChange={handleChange}
               onKeyUp={handleKeyUp}/>
  )
}