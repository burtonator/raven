import React, { useCallback } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Link,
  Typography
} from '@mui/material';
import { MarkdownViewer } from './MarkdownViewer';
import {
  NoteEntry,
  NoteNameStr,
  useSmartNoteContext
} from './SmartNoteIndexProvider';
import NextLink from 'next/link'
import { Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface SmartNoteProps extends NoteEntry {
}

export function SmartNote(props: SmartNoteProps) {

  const {content, name, items, model} = props
  const router = useRouter()

  const smartNoteContext = useSmartNoteContext()

  const computeRouteForNote = useCallback((note: NoteNameStr) => {
    return '/smart/' + encodeURIComponent(note)
  }, [])

  const handleDelete = useCallback(() => {

    smartNoteContext.deleteNote(name)

    router.push('/smart')
      .catch(console.error)

  }, [name, router, smartNoteContext])

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
                    <NextLink href={computeRouteForNote(current)} passHref={true}>
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

        {model && (
          <Box color="text.disabled">
            <Typography variant='body2'>
              model: {model}
            </Typography>
          </Box>
        )}

        <IconButton color="text.disabled" style={{marginLeft: 'auto'}} onClick={handleDelete}>
          <Delete/>
        </IconButton>
      </CardActions>
    </Card>
  )
}
