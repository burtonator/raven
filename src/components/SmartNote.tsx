import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import {
  Box,
  Tooltip, tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';

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

const index: {[key in NodeNameStr]: NoteEntry} = {}

interface SmartNoteProps {
  readonly entry: NoteEntry
}


const HtmlTooltip = styled((props: TooltipProps) => (
  <Tooltip classes={{ popper: props.className }} arrow={props.arrow ?? false} title={props.title}/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    //fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


// const CustomTooltip = (props: TooltipProps) => {
//   return <Tooltip {...props}/>
// }

const unitedStates: NoteEntry = {
  name: 'United States',
  content: "This is the node for United States",
  items: [
  ]
}
export function SmartNote(props: SmartNoteProps) {
  return (
    <>
      <Box pt={1} pb={1} pl={0}>
        <Typography variant="h4">{props.entry.name}</Typography>
      </Box>
      <ReactMarkdown remarkPlugins={[remarkGfm]}
                     components={{
                       a: (props) => {
                         return (
                           <HtmlTooltip arrow title={<SmartNote entry={unitedStates}/>}>
                             <a {...props}>hello world</a>
                           </HtmlTooltip>
                         )
                       }
                     }}
                     rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
    </>
  )
}
