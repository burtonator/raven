import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Tooltip } from '@mui/material';

const content = `Hello, this is documentation about [World War II](https://www.wikipedia.org)`

export type MarkdownStr = string

/**
 * A reference to another note like "World War II" or "San Francisco"
 */
export type NodeRefStr = string

interface NoteEntry {
  readonly content: MarkdownStr
}

const index: {[key in NodeRefStr]: NoteEntry} = {}

interface SmartNoteProps {
  readonly ref: NodeRefStr
}

export function SmartNote(props: SmartNoteProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}
                   components={{
                     a: (props) => {
                       return (
                         <Tooltip arrow title="This is the tooltip... ">
                           <a {...props}>hello world</a>
                         </Tooltip>
                       )
                     }
                   }}
                   rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  )
}

export function SmartNoteView() {

}