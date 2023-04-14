import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { MarkdownViewer } from './MarkdownViewer';
import { NoteEntry, NoteNameStr, useSmartNote } from './SmartNoteIndexProvider';
import NextLink from 'next/link'
import { Delete } from '@mui/icons-material';

interface SmartNoteProps extends NoteEntry {
}

export function SmartNote(props: SmartNoteProps) {

  const {content, name, items} = props


  const computeRouteForNote = useCallback((note: NoteNameStr) => {
    return '/smart/' + encodeURIComponent(note)
  }, [])

  return (
    <Card elevation={2} style={{width: '800px'}} square={false}>
      <CardContent>
        <Box p={0}>
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


      </CardContent>
      <CardActions>
        <IconButton style={{marginLeft: 'auto'}}>
          <Delete/>
        </IconButton>
      </CardActions>
    </Card>
  )
}
