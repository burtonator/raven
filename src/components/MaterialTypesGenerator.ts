import { createOpenAIClient } from '../useOpenAPI';
import { Configuration, OpenAIApi } from 'openai';

export namespace MaterialTypesGenerator {

  //const MODEL = 'gpt-3.5-turbo'
  const MODEL = 'gpt-4'

  const SYSTEM_PROMPT = `
You will act as a Software Engineer.
  
Output a list of all React components from Material UI with their names, and 
their property names, and types. The output format should be written as a set
of Typescript interfaces.

There should be a base type named ElementRef which has the name of the Element with a single property.

For example.  If you're working with Button you should have a type called ButtonRef with a single Button property.

It should hold all the elements and can only contain one key (which points to the element).

All output must begin with '\`\`\`typescript' and be within a markdown code block.   

# Examples

## Button 

\`\`\`typescript

export type ButtonRef = Readonly<{
  Button: ButtonRefProperties
}>

export type ButtonRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableElevation: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  // endIcon: React.ReactElement
  fullWidth: boolean
  href: string
  // onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  size: 'small' | 'medium' | 'large'
  // startIcon: React.ReactElement
  variant: 'text' | 'outlined' | 'contained'
}>
\`\`\`

## FormControlLabel

\`\`\`typescript
export type FormControlLabelRef = Readonly<{
  FormControlLabel: FormControlLabelRefProperties
}>

export type FormControlLabelRefProperties = Readonly<{
  // control: React.ReactElement
  disabled: boolean
  // label: React.ReactNode
  labelPlacement: 'end' | 'start' | 'top' | 'bottom'
  value: any
}>
\`\`\`

## Select

\`\`\`typescript

export type SelectRef = Readonly<{
  Select: SelectRefProperties
}>

export type SelectRefProperties = Readonly<{
  autoWidth: boolean
  displayEmpty: boolean
  // IconComponent: React.ElementType
  // input: React.ReactElement
  label: string
  labelId: string
  labelWidth: number
  // MenuProps: Partial<MenuRefProperties>
  multiple: boolean
  native: boolean
  // onClose: (event: React.SyntheticEvent) => void
  // onOpen: (event: React.SyntheticEvent) => void
  open: boolean
  // renderValue: (value: any) => React.ReactNode
  value: any
  variant: 'standard' | 'outlined' | 'filled'
}>

\`\`\`

Please use the following rules for Typescript generation:

- NO semicolon at the end of the line
- NO comments
- Do not complain about being an AI model.
- Do not include the 'ref' property
- Comment out any event handlers (functions) like onClick, onMouseOver, onKeyPress, etc.  These are usually properties prefixed with 'on' and are functions/lambdas.
- Do not include the 'style' property
- Do not include the 'classes' property
- Do not include the 'children' property
- Do not include the className property
- Comment out any property with the following types:
  - React.ElementType 
  - React.ReactNode
  - React.ReactElement
  - JSX.Element
  - React.ComponentType
- Do not include any property that begins with 'aria-
- Do not include a URL in any of the documentation output
- The property names should be sorted alphabetically. 
- ONLY emit typescript directly. DO NOT provide any commentary on the output.

- Do not include documentation for properties if the documentation doesn't add 
  any additional description of the content.  For example. If the property name 
  is 'length' and the only documentation you can generate is 'set the length' 
  then please don't include that. 

# Exclusions

Please make the following changes to specific types


## TextField

- comment out the following properties:
  - SelectProps
  - InputProps
  - InputLabelProps

## Popover

- comment out the following properties:
  - PaperProps

## Menu
- comment out the following properties:
  - PaperProps

## Drawer
- comment out the following properties:
  - PaperProps
  - SlideProps
  - ModalProps

## Select
- comment out the following properties:
  - MenuProps

## Menu

- comment out the following properties:
  - PaperProps
  - PopoverClasses 

## Popper

- comment out the following properties:
  - popperRef
  - popperOptions
  - modifiers

- Materialize the 'placement' property into an enum 


`.trim()

  interface Generated {
    readonly raw: string
    readonly code: string | undefined
  }

  export async function generate(component: string): Promise<Generated | undefined> {

    // TODO:
    //
    // - maybe it's better to build an autogpt-style UX to build agents with UIs...
    //
    // - estimate how large the resulting types would be for all the components
    //   in MUI
    //
    // - see if I can use the Github
    //
    // - create a 'default' splash app inside ChatMUI...
    //
    // -

    const client = new OpenAIApi(new Configuration({apiKey: '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'}))

    // generate the types for the given component....
    const res = await client.createChatCompletion({
      model: MODEL,
      temperature: 0.0,
      max_tokens: 2048,
      top_p: 1,
      n: 1,
      messages: [{
        role: 'system',
        content: SYSTEM_PROMPT
      },
        {
          role: 'user',
          content: `Generate types for ALL of the following components: ${component}`
        }
      ]
    })

    function parseResult(text: string): string | undefined {

      const s = text.split('```typescript')

      if (s.length === 2) {
        return s[1].substring(0, s[1].length - '```'.length - 1)
      }

      console.warn("Unable to parse output for component: " + component)

      return undefined

    }


    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        const code = parseResult(first.message.content)
        return {code, raw: first.message.content}
      }
    }

    return undefined

  }

}