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

There should be a base type named ElementRef.

It should hold all the elements and can only contain one key (which points to the element).

For example:

\`\`\`typescript

export type ButtonRef = Readonly<{
  Button: ButtonRefProperties
}>

export type ButtonRefProperties = Readonly<{
  // The variant to use.
  variant: 'text' | 'outlined' | 'contained'

  // The size of the button.
  size: 'small' | 'medium' | 'large'

  // The color of the button.
  color: 'default' | 'inherit' | 'primary' | 'secondary'

  // If true, the button will be disabled.
  disabled: boolean

  // If true, the  keyboard focus ripple will be disabled.
  disableFocusRipple: boolean

  // If true, the button will take up the full width of its container.
  fullWidth: boolean

  // The content of the button.
  label: string

  // The URL to link to when the button is clicked.
  href: string

  // The component used for the root node.
  component: React.ElementType

  // The target of the link.
  target: string

  // The rel attribute for the link.
  rel: string
}>
\`\`\`

Please use the following rules for Typescript generation:

- NO semicolon at the end of the line
- NO comments
- Include jsdoc of the component, and all properties
- Do not complain about being an AI model.
- Provide documentation for the Material UI component as it would appear in
  jsdoc that a Software Engineer would read.  The documentation should just be 
  the top level jsdoc and what the button does and the behavior it provides.  
  For example.  For Appbar, the documentation should go on the AppBarRef and be 
  something like: "The top App bar provides content and actions related to the
  current screen. It's used for branding, screen titles, navigation, and
  actions. It can transform into a contextual action bar or be used as a navbar."
- Do not include the 'ref' property
- Do not include any event handlers like onClick, onMouseOver, onKeyPress, etc.  These are usually properties prefixed with 'on'
- Do not include the 'style' property
- Do not include the 'classes' property
- Include jsdoc for each property from the documentation.
- Do not include the 'children' property
- Do not include the className property
- Do not include any property with the type React.ElementType or React.ReactNode
- Do not include any property that begins with 'aria-
- Do not include a URL in any of the documentation output
- All jsdoc comments should begin with // and should not use /** */
- The property names should be sorted alphabetically. 
- ONLY emit typescript directly. DO NOT provide any commentary on the output. 

`.trim()

  export async function generate(component: string): Promise<string | undefined> {

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

      console.warn("Unable to parse ")

      return undefined

    }


    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        return parseResult(first.message.content)
      }
    }

    return undefined

  }

}