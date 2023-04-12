import {
  NoteEntry,
  useSmartNote,
  useSmartNoteContext
} from '@/src/components/SmartNoteIndexProvider';
import { SmartNote } from '@/src/components/SmartNote';
import { LinearProgress } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSmartNoteExecutor } from '@/src/components/useSmartNoteExecutor';

interface SmartNoteExecutorProps {
  readonly name: string
}

export default function SmartNoteExecutor(props: SmartNoteExecutorProps) {

  const noteWithinStore = useSmartNote(props.name)
  const [noteFromState, setNoteFromState] = useState<NoteEntry | undefined>(undefined)
  const smartNoteContext = useSmartNoteContext()
  const smartNoteExecutor = useSmartNoteExecutor()
  const executedRef = useRef(false)

  const handleExecution = useCallback((question: string) => {

    async function doAsync() {

      if (executedRef.current) {
        // prevent accidental double dispatch
        return
      }

      executedRef.current = true

      const res = await smartNoteExecutor(question)
      if (res?.content) {
        const newNote = {name: props.name, content: res.content, items: []}
        smartNoteContext.writeNote(newNote)
        setNoteFromState(newNote)
      }
      console.log(res?.content)
    }

    doAsync()
      .catch(err => console.error(err))

  }, [props.name, smartNoteContext, smartNoteExecutor]);

  const note = noteWithinStore ?? noteFromState

  useEffect(() => {

    if (! note) {
      handleExecution(props.name)
    }

  }, [handleExecution, note, props.name])


  if (note) {
    console.log("Rendering note: ", note)
    return <SmartNote {...note}/>
  }

  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10000, width: '100%'}}>
        <LinearProgress variant="indeterminate"/>
      </div>
    </>
  )


}