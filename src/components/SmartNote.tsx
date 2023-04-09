import React from 'react';
import {
  Box, Button, Link, Paper,
  Typography
} from '@mui/material';
import { MarkdownViewer } from './MarkdownViewer';
import { NoteNameStr, useSmartNote } from './SmartNoteIndexProvider';
import { useRouter } from 'next/router';

const content = `Hello, this is documentation about [World War II](https://www.wikipedia.org)`

export type MarkdownStr = string

/**
 * A reference to another note like "World War II" or "San Francisco"
 */
export type NodeNameStr = string

export interface NoteEntry {
  readonly name: NodeNameStr
  readonly content: MarkdownStr
  readonly items: ReadonlyArray<NodeNameStr>
}


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

interface SmartNoteProps {
  readonly name: NoteNameStr
}

export function SmartNote(props: SmartNoteProps) {

  const router = useRouter()

  const note = useSmartNote(props.name)

  if (! note) {
    return <div>Not Found</div>
  }

  return (
    <Paper elevation={1} style={{width: '600px'}} square={true}>
      <Box p={1}>
        <Box pt={1} pb={1} pl={0}>
          <Typography variant="h5">{note.name}</Typography>
        </Box>
        <MarkdownViewer content={note.content}/>

        <Typography variant="h6">Do You Want to Know More?</Typography>

        <ul>
          {note.items.map(current => (
            <li key={current}>
              <Link href={router.pathname + ',' + encodeURIComponent(current)}>{current}</Link>
            </li>
          ))}
        </ul>

      </Box>
    </Paper>
  )
}
