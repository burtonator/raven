import { SmartNote } from './SmartNote';
import { Box, Divider } from '@mui/material';
import { CSSProperties, useState } from 'react';
import {
  NoteNameStr
} from './SmartNoteIndexProvider';

import {Fragment} from 'react'
import { useRouter } from 'next/router';

/**
 * Route paths are going to be something like /Foo,Bar and be a stack on
 * desktop...
 *
 */
export function useSmartNoteRouter() {

  const router = useRouter()
  const idx = router.pathname.lastIndexOf("smart/")
  if (idx === -1) {
    return []
  }

  const suffix = router.pathname.substring(idx + 1, router.pathname.length)
  return suffix.split(",").map(current => decodeURIComponent(current))

}

interface SmartNoteViewProps {
  readonly stack: ReadonlyArray<NoteNameStr>
  readonly style?: CSSProperties
}

export function SmartNoteView(props: SmartNoteViewProps) {

  const {stack} = props

  console.log("FIXME", {stack})

  return (
    <div style={{...props.style, display: 'flex'}}>

      {stack.map((current, index) => {
          return (
            <Fragment key={current}>

              {index > 0 && (
                <Divider orientation='vertical'/>
              )}

              <Box mr={1}>
                <SmartNote name={current}/>
              </Box>
            </Fragment>
          );
        }
      )}
    </div>
  )

}