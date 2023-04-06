import { Box, LinearProgress, TextField } from '@mui/material';
import React, { KeyboardEvent, useCallback, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  ChatCompletionRequestMessage, Configuration,
  CreateChatCompletionRequest, OpenAIApi
} from 'openai';
import { CreateChatCompletionResponse } from 'openai/api';
import { AxiosResponse } from 'axios';

interface InputBoxProps {
  readonly onPrompt: (text: string) => void
  readonly placeholder: string
}

export function InputBox(props: InputBoxProps) {

  const {onPrompt} = props
  const inputRef = useRef('')

  const updateInput = useCallback((newInput: string) => {
    inputRef.current = newInput
  }, [])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {

      if(event.key === 'Enter') {
        if (inputRef.current.trim() !== '') {
          onPrompt(inputRef.current.trim())
          updateInput('')
        }
      }
    },
    [onPrompt]
  )

  return (
    <div style={{maxWidth: '800px'}}>
      <TextField fullWidth={true}
                 onChange={event => updateInput(event.target.value)}
                 onKeyUp={handleKeyUp}
                 variant="standard"
                 placeholder={props.placeholder}/>
    </div>
  )
}

interface ResponseBoxProps {
  readonly content: string
}

export function ResponseBox(props: ResponseBoxProps) {

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{props.content}</ReactMarkdown>
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

const SYSTEM_PROMPT = `You are a helpful assistant.`

export function createPrompt(text: string) {
  return `  
Answer the following query/question/prompt from the user:

${text}

After that, based on the response to that question, and the question itself, provide five more questions that I'm most likely to ask about.  

The questions should be prefixed by "\\n---\\n"  and should have one question per line.  `.trim()

}

export function createCompletionRequest(text: string): CreateChatCompletionRequest {

  return {
    // model: 'gpt-4',
    model: 'gpt-3.5-turbo',
    temperature: 0.0,
    max_tokens: 256,
    top_p: 1,
    n: 1,
    messages: [
      {role: "system", content: SYSTEM_PROMPT.trim()},
      {role: 'user', content: createPrompt(text)}
    ]
  }

}

function computeBrowserBasePath() {

  if (typeof document !== 'undefined') {
    return document.location.origin + '/api/openai/proxy'
  }

  return undefined

}

const conf = new Configuration({
  basePath: computeBrowserBasePath()
})

const openai = new OpenAIApi(conf);

export function Node(props: NodeProps) {

  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState(props.content)
  const [executing, setExecuting] = useState(false)

  const handleExecution = useCallback((prompt: string) => {

    console.log("Got command: " + prompt)

    async function doAsync() {
      try {

        setExecuting(true)
        const req = createCompletionRequest(prompt)
        const before = Date.now()
        const completion: Promise<AxiosResponse<CreateChatCompletionResponse>> = openai.createChatCompletion(req)
        const res = await completion
        const after = Date.now()
        const duration = after - before

        if (res.data.choices.length > 0) {
          const first = res.data.choices[0]
          if (first.message) {
            setContent(first.message.content)
          }
        }

      } finally {
        setExecuting(false)
      }
    }

    doAsync()
      // TODO properly handle errors in the UI...
      .catch(err => console.error('Unhandled error', err))

  }, [])

  const handlePrompt = useCallback((prompt: string) => {
    //setContent(prompt)
    handleExecution(prompt)
  }, [handleExecution])

  return (
    <div>

      {content !== undefined && <div>{content}</div>}

      {content === undefined && <InputBox onPrompt={handlePrompt} placeholder="Let's get started.  What would you like to know about?"/>}

      {props.items !== undefined && (
        <>
          {props.items.map((item, idx) => (
            <div key={idx}>

            </div>
          ))}
          <InputBox onPrompt={() => console.log('hello')} placeholder="... or ask another question."/>
        </>
      )}

      {executing && <LinearProgress variant='indeterminate'/>}

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