import remarkGfm from 'remark-gfm';
import { CodeEditor } from './CodeEditor';
import rehypeHighlight from 'rehype-highlight';
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
          const match = /language-(\w+)/.exec(className || '')
          const language = match[1]
          const code = children

          console.log("FIXME: ", node)
          console.log("FIXME: ", node.outerHTML)

          const sourcecode = String(children).replace(/\n$/, '')

          // FIXME: support inline...

          console.log("FIXME: ", {language, sourcecode, children, node})
          return (
            <CodeEditor defaultValue={sourcecode} language={language}/>
          )
        }
      }}
      rehypePlugins={[]}>{content}</ReactMarkdown>
  )
}