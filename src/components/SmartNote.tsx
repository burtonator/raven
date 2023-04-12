import React, { useCallback } from 'react';
import {
  Box, Button, Link, Paper,
  Typography
} from '@mui/material';
import { MarkdownViewer } from './MarkdownViewer';
import { NoteEntry, NoteNameStr, useSmartNote } from './SmartNoteIndexProvider';
import NextLink from 'next/link'

//
// const HtmlTooltip = styled((props: TooltipProps) => (
//   <Tooltip classes={{ popper: props.className }} arrow={props.arrow ?? false} title={props.title}/>
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     //fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9',
//   },
// }));

interface SmartNoteProps extends NoteEntry {
}

export function SmartNote(props: SmartNoteProps) {

  const {content, name, items} = props


  const computeRouteForNote = useCallback((note: NoteNameStr) => {

    // const idx = notesStack.indexOf(props.name)
    //
    // const currentNoteStackPath = notesStack.splice(idx)
    // const newStack = [...currentNoteStackPath, note]
    //
    // const base = '/smart/'
    //
    // return base + newStack.map(encodeURIComponent).join(',')

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
