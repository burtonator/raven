import React, { useCallback } from 'react';
import {
  Box, Button, Link, Paper,
  Typography
} from '@mui/material';
import { MarkdownViewer } from './MarkdownViewer';
import { NoteEntry, NoteNameStr, useSmartNote } from './SmartNoteIndexProvider';
import NextLink from 'next/link'

interface SmartNoteProps extends NoteEntry {
}

export function SmartNote(props: SmartNoteProps) {

  const {content, name, items} = props


  const computeRouteForNote = useCallback((note: NoteNameStr) => {
    return '/smart/' + encodeURIComponent(note)
  }, [])

  return (
    <Paper elevation={2} style={{width: '800px'}} square={false}>
      <Box p={2}>
        <Box pl={0}>
          <Typography variant="h5">{name}</Typography>
        </Box>
        <MarkdownViewer content={content}/>

        {items.length > 0 && (
          <>
            <Typography variant="h6">Do You Want to Know More?</Typography>

            <ul>
              {items.map(current => (
                <li key={current}>
                  <NextLink href={computeRouteForNote(current)}>
                    <Link variant="body1">{current}</Link>
                  </NextLink>
                </li>
              ))}
            </ul>
          </>
        )}

      </Box>
    </Paper>
  )
}
