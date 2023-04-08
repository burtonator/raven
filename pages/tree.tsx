import {
  Box,
  Button,
  Collapse,
  LinearProgress,
  TextField
} from '@mui/material';
import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  Configuration,
  CreateChatCompletionRequest, OpenAIApi
} from 'openai';
import { CreateChatCompletionResponse } from 'openai/api';
import { AxiosResponse } from 'axios';
import { useStateRef } from '@/src/useStateRef';

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

interface Item {
  readonly content: string
}

const SYSTEM_PROMPT = `You are a helpful assistant.`

export function createPrompt(text: string) {
  return `  
Answer the following query/question/prompt from the user:

${text}

After that, based on the response to that question, and the question itself, provide five more questions that I'm most likely to ask about.  

The list of questions should be prefixed by "\n---\n"  and should have one question per line.  Do not number them or prefix them with a hyphen.  `.trim()

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

interface NodeProps {
  readonly question: string | undefined
  readonly content: string | undefined
  readonly defaultExpanded?: boolean
  readonly root?: boolean
}

export function Node(props: NodeProps) {
  const {autoExecute, root} = props

  const [expand, setExpand] = useState(props.defaultExpanded ?? false)
  const [question, setQuestion] = useState(props.question)
  const [content, setContent] = useState(props.content)
  const [executing, setExecuting] = useState(false)
  const [items, setItems] = useState<ReadonlyArray<Item> | undefined>(undefined)

  const [error, setError] = useState<unknown | undefined>(undefined)

  const [expanded, setExpanded, expandedRef] = useStateRef(false)


  useEffect(() => {

    if (! root && ! expandedRef.current && expand) {
      expandedRef.current = true
    }

  }, [expand, root])

  const handleExpand = useCallback(() => {

    if (! expandedRef.current) {
      setExpanded(true)
    }

    setExpand(! expand)

  }, [expandedRef, setExpanded, expand])

  const handleExecution = useCallback((question: string) => {

    console.log("Got question: " + question)

    async function doAsync() {
      try {

        setExecuting(true)
        const req = createCompletionRequest(question)
        const before = Date.now()
        const completion: Promise<AxiosResponse<CreateChatCompletionResponse>> = openai.createChatCompletion(req)
        const res = await completion
        const after = Date.now()
        const duration = after - before

        function createTestFromResponseMessage() {

          if (res.data.choices.length > 0) {
            const first = res.data.choices[0]
            if (first.message) {
              return first.message.content
            }
          }

        }

        const text = createTestFromResponseMessage()

        interface ContentAndQuestions {
          readonly content: string
          readonly questions: readonly string[]
        }

        function splitContentAndQuestions(text: string): ContentAndQuestions | undefined {

          const token = "---\n"
          const idx = text.lastIndexOf(token)

          if (idx !== -1) {
            const content = text.substring(0, idx)
            const question_block = text.substring(idx + token.length, text.length - 1)
            const questions = question_block.split("\n")
            return {content, questions}
          }

          return undefined
        }

        const contentAndQuestions = splitContentAndQuestions(text)

        if (contentAndQuestions) {
          setContent(contentAndQuestions.content)
          setItems(contentAndQuestions.questions.map(current => {
            return {
              content: current
            }
          }))
          setExpand(true)

        }


      } finally {
        setExecuting(false)
      }
    }

    doAsync()
      // TODO properly handle errors in the UI...
      .catch(err => {
        console.error('Unhandled error', err);
        setError(err)
      })

  }, [])

  const handleQuestion = useCallback((question: string) => {
    setQuestion(question)
    handleExecution(question)
  }, [handleExecution])

  // auto execution can happen the first time the parent is expanded...

  useEffect(() => {

    if (autoExecute && question && ! content) {
     // if we need to auto execute, and we have a question, and we have content,
     // go ahead and render ...
      console.log("FIXME: auto executing node... ")
      handleExecution(question)
    }

  }, [autoExecute, content, question, handleExecution])

  return (
    <div>

      {content && <Button onClick={handleExpand}>Expand</Button>}

      {question === undefined && <InputBox onPrompt={handleQuestion} placeholder="Let's get started.  What would you like to know about?"/>}

      {question !== undefined && <div>{question}</div>}

      {content !== undefined && <div>{content}</div>}

      {expand && items !== undefined && (
        <Collapse pl={3} pt={2} in={expand} timeout='auto' sx={{pl: 3}}>
          {items.map((item, idx) => (
            <div key={idx}>
              <Node question={item.content} autoExecute={expanded ?? root ?? false}/>
            </div>
          ))}
          <InputBox onPrompt={() => console.log('hello')} placeholder="... or ask another question."/>
        </Collapse>
      )}

      {executing && <LinearProgress variant='indeterminate'/>}

    </div>
  )

}

export default function Tree() {

  return (
    <Box p={2}>
      {/*<Node question="What is WWII?"/>*/}
      <Node question={undefined} defaultExpanded={true} root={true}/>
    </Box>
  )

}