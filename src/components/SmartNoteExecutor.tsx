import {
  useSmartNote,
  useSmartNoteContext
} from '@/src/components/SmartNoteIndexProvider';
import { SmartNote } from '@/src/components/SmartNote';
import { LinearProgress } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSmartNoteExecutor } from '@/src/components/useSmartNoteExecutor';

interface SmartNoteExecutorProps {
  readonly name: string
}

export default function SmartNoteExecutor(props: SmartNoteExecutorProps) {

  const note = useSmartNote(props.name)
  const smartNoteContext = useSmartNoteContext()
  const smartNoteExecutor = useSmartNoteExecutor()

  const handleExecution = useCallback((question: string) => {

    async function doAsync() {
      const res = await smartNoteExecutor(question)
      if (res?.content) {
        console.log("FIXME: writing note to store... ")
        smartNoteContext.writeNote({name: props.name, content: res.content, items: []})
      }
      console.log(res?.content)
    }

    doAsync()
      .catch(err => console.error(err))

  }, [props.name, smartNoteContext, smartNoteExecutor]);

  useEffect(() => {

    // FIXME: only allow execution once...
    if (! note) {
      handleExecution(props.name)
    }

  }, [handleExecution, note, props.name])

  if (note) {
    return <SmartNote name={props.name}/>
  }

  return (
    <>
      <LinearProgress variant="indeterminate"/>
    </>
  )


}