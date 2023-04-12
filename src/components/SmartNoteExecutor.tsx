import {
  NoteEntry,
  useSmartNote,
  useSmartNoteContext
} from '@/src/components/SmartNoteIndexProvider';
import { SmartNote } from '@/src/components/SmartNote';
import { LinearProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSmartNoteExecutor } from '@/src/components/useSmartNoteExecutor';

interface SmartNoteExecutorProps {
  readonly name: string
}

export default function SmartNoteExecutor(props: SmartNoteExecutorProps) {

  const noteWithinStore = useSmartNote(props.name)
  const [noteFromState, setNoteFromState] = useState<NoteEntry | undefined>(undefined)
  const smartNoteContext = useSmartNoteContext()
  const smartNoteExecutor = useSmartNoteExecutor()

  const handleExecution = useCallback((question: string) => {

    async function doAsync() {
      const res = await smartNoteExecutor(question)
      if (res?.content) {
        console.log("FIXME: writing note to store... ")
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

    // FIXME: only allow execution once...
    if (! note) {
      handleExecution(props.name)
    }

  }, [handleExecution, note, props.name])


  if (note) {
    console.log("FIXME rendering note: ", note)
    return <SmartNote {...note}/>
  }

  return (
    <>
      <LinearProgress variant="indeterminate"/>
    </>
  )


}