import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import React from 'react';

const content = `Hello, this is documentation about [World War II](https://www.wikipedia.org)`

export function SmartNote() {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}
                   components={{
                     a: (props) => {
                       return (
                         <a {...props}>hello world</a>
                       )
                     }
                   }}
                   rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  )
}