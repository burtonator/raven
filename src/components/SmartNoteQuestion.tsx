import { LinearProgress, TextField } from '@mui/material';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback, useMemo,
  useState
} from 'react';
import { useStateRef } from '@/src/useStateRef';
import { useSmartNoteExecutor } from '@/src/components/useSmartNoteExecutor';
import { useRouter } from 'next/router';

export function useSmartNoteRouter() {
  const router = useRouter()

  return useMemo(() => {
    return {
      push: (name: string) => {
        router.push('/smart/n/' + encodeURIComponent(name))
          .catch(console.error)
      },
      computePath: (name: string) => {
        return '/smart/n/' + encodeURIComponent(name)
      }
    }
  }, [router])
}

export function SmartNoteQuestion() {

  const [input, setInput, inputRef] = useStateRef('')
  const router = useRouter()

  const handleExecution = useCallback((question: string) => {
    router.push('/smart/n/' + encodeURIComponent(question))
      .catch(console.error)

  }, [router]);

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