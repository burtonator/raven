import remarkGfm from 'remark-gfm';
import { CodeEditor } from './CodeEditor';
import ReactMarkdown from 'react-markdown';
import React from 'react';

interface MarkdownEditorProps {
  readonly content: string
}

export function MarkdownEditor(props: MarkdownEditorProps) {

  const {content} = props

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {

          console.log("FIXME: props: ", props)
          const {node, inline, className, children} = props

          const sourcecode = String(children).replace(/\n$/, '')

          const match = /language-(\w+)/.exec(className || '')

          if (match &&  ! inline) {
            const language = match[1]
            return (
              <CodeEditor defaultValue={sourcecode} language={language}/>
            )
          } else {
            return (
              <code>{sourcecode}</code>
            )
          }

        }
      }}
      rehypePlugins={[]}>{content}</ReactMarkdown>
  )
}