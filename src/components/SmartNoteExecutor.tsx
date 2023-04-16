import {
  NoteEntry,
  useSmartNote,
  useSmartNoteContext
} from './SmartNoteIndexProvider';
import { SmartNote } from './SmartNote';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSmartNoteExecutor } from './useSmartNoteExecutor';
import { ISODateTimeStrings } from '../ISODateTimeStrings';

interface SmartNoteExecutorProps {
  readonly name: string
}

export default function SmartNoteExecutor(props: SmartNoteExecutorProps) {

  const noteWithinStore = useSmartNote(props.name)
  const [noteFromState, setNoteFromState] = useState<NoteEntry | undefined>(undefined)
  const smartNoteContext = useSmartNoteContext()
  const smartNoteExecutor = useSmartNoteExecutor()
  const executedRef = useRef(false)

  const note = noteWithinStore ?? noteFromState

  const handleExecution = useCallback((question: string) => {

    async function doAsync() {

      const res = await smartNoteExecutor(question)
      if (res) {

        if (res.content) {
          const newNote = {
            name: props.name,
            content: res.content,
            items: res.items,
            created: ISODateTimeStrings.create(),
            model: res.model
          }
          smartNoteContext.writeNote(newNote)
          setNoteFromState(newNote)
        } else {
          console.warn("No res.content")
        }
      } else {
        console.warn("No res")
      }

    }

    if (executedRef.current) {
      // prevent accidental double dispatch
      return
    }

    executedRef.current = true

    doAsync()
      .catch(err => console.error("Unable to handle response: ", err))

  }, [props.name, smartNoteContext, smartNoteExecutor]);

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

      <CircularProgress variant='indeterminate' size="large"/>

    </>
  )


}