import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Tooltip } from '@mui/material';

const content = `Hello, this is documentation about [World War II](https://www.wikipedia.org)`

export function SmartNote() {
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