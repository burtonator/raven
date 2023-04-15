import { SmartNote } from './SmartNote';
import { Box, Divider } from '@mui/material';
import { CSSProperties, useState } from 'react';
import {
  NoteNameStr
} from './SmartNoteIndexProvider';

import {Fragment} from 'react'
import { useRouter } from 'next/router';
import SmartNoteExecutor from '@/src/components/SmartNoteExecutor';

/**
 * Route paths are going to be something like /Foo,Bar and be a stack on
 * desktop...
 *
 */
export function useSmartNoteRouterNotesStack() {

  const router = useRouter()
  const prefix = "smart/n/"
  const idx = router.asPath.indexOf(prefix)

  if (idx === -1) {
    console.log("No routes")
    return []
  }

  const suffix = router.asPath.substring(idx + prefix.length, router.asPath.length)
  return suffix.split(",").map(current => decodeURIComponent(current))

}

interface SmartNoteViewProps {
  readonly stack: ReadonlyArray<NoteNameStr>
  readonly style?: CSSProperties
}

export function SmartNoteView(props: SmartNoteViewProps) {

  const {stack} = props

  return (
    <div style={{...props.style, display: 'flex'}}>

      {stack.map((current, index) => {
          return (
            <Fragment key={current}>

              {index > 0 && (
                <Divider orientation='vertical'/>
              )}

              <Box mr={1}>
                <SmartNoteExecutor name={current}/>
              </Box>
            </Fragment>
          );
        }
      )}
    </div>
  )

}