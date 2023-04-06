import { Box, LinearProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface InputBoxProps {
  readonly onPrompt: (text: string) => void
  readonly placeholder: string
}

export function InputBox(props: InputBoxProps) {

  return (
    <div style={{maxWidth: '800px'}}>
      <TextField fullWidth={true} onChange={event => event.target.value} variant="standard" placeholder={props.placeholder}/>
    </div>
  )
}

interface ResponseBoxProps {
  readonly content: string
}

export function ResponseBox(props: ResponseBoxProps) {

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{props.content}</ReactMarkdown>}
    </div>
  )
}

interface IItem {
  readonly content: string
}

interface NodeProps {
  readonly content: string | undefined
  readonly items: ReadonlyArray<IItem> | undefined
}

export function computePrompt(text: string) {
  return `  
Answer the following query/question/prompt from the user:

${text}

After that, based on the response to that question, and the question itself, provide five more questions that I'm most likely to ask about.  

The questions should be prefixed by "\\n---\\n"  and should have one question per line.  `.trim()

}

export function Node(props: NodeProps) {

  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState(props.content)
  const [executing, setExecuting] = useState(false)

  return (
    <div>

      {executing && <LinearProgress variant='indeterminate'/>}

      {content === undefined && <InputBox onPrompt={setContent} placeholder="Let's get started.  What would you like to know about?"/>}

      {props.items !== undefined && (
        <>
          {props.items.map((item, idx) => (
            <div key={idx}>

            </div>
          ))}
          <InputBox onPrompt={() => console.log('hello')} placeholder="... or ask another question."/>
        </>
      )}

    </div>
  )

}

export default function Tree() {

  return (
    <Box p={2}>
      <Node />
    </Box>
  )

}