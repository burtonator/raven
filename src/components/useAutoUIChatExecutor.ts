import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest
} from 'openai';
import { useCallback } from 'react';
import { useOpenAPI } from '../useOpenAPI';

// const MODEL = 'gpt-4'
const MODEL = 'gpt-3.5-turbo'

function parseGeneratedCode(text: string, type: 'yaml'): string | undefined {

  const START_JS = `\`\`\`${type}`
  const END_JS = '```'

  if (text.startsWith(START_JS)) {
    return text.substring(START_JS.length, text.length - END_JS.length - 1)
  }

  return undefined

}

export interface AutoUIExecution {
  readonly code: string
  readonly messages: ReadonlyArray<ChatCompletionRequestMessage>
}

export function useAutoUIChatExecutor() {

  const openai = useOpenAPI()

  return useCallback(async (directive: string): Promise<AutoUIExecution | undefined> => {

    function createChatCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

      return {
        model: MODEL,
        temperature: 0.0,
        max_tokens: 2048,
        top_p: 1,
        n: 1,
        messages: [...messages]
      }

    }

    const messages: ReadonlyArray<ChatCompletionRequestMessage> = [
      {"role": "system", "content": SYSTEM_PROMPT.trim()},
      {
        role: 'user',
        content: directive
      }
    ]


    const req = createChatCompletionRequest(messages)
    console.log("Executing chat: ", JSON.stringify(req, null, '  '))

    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()
    const duration = after - before
    console.log("Got response: ", res)
    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        const code = parseGeneratedCode(first.message.content, 'yaml')

        if (code) {
          return {code, messages}
        }
      }
    }

    return undefined
  }, [openai])

}


const SYSTEM_PROMPT = `
You will act as a Software Engineer.

The user will ask you for a user interface, and you will generate the UI representation in YAML.

The entire user interface will be generated from Material UI and you can use
types from the following libraries:

    - @mui/material
    - @mui/system

Rules for output generation:

- NEVER use {{}} or anything like that in the YAML. There is no template replacement. You must include literal values like "Kevin' or "123 Fake Street"

- You MUST ONLY use standard Material UI 5.x components
- You MUST NOT use Material UI icons.
- You MAY use HTML elements like main, div, span, a, i, b, etc...
- You JUST quote string values in YAML output
- If the user makes any CHANGES to the generated UI, they MUST be given in JSON patch format.
- The document should END with the YAML representation of the UI.  Do not include any other text after the YAML document.
- NEVER explain the output. ONLY generate YAML

# The React components will be mapped to YAML as follows.

## Example 1
 
Create a simple 'click me' button

\`\`\`yaml
---
Button:
    color: "primary"
    children:
        Click Me
\`\`\`

# Here are some examples of full output

## Example 2

Create two buttons in a grid.  The first one will say 'hello' and the second one will say 'world'

\`\`\`yaml
---
Grid:
    children:
        - Grid:
            item: true
            children:
                - button:
                    children: "hello"
        - Grid:
            item: true
            children:
                - button:
                    children: "world"
\`\`\`


## Example 3:

Generate a form to accept users address including first name, last name, city, state zip, etc.

\`\`\`yaml
---
Container:
  children:
    - form:
        children:
          - Grid:
              container: true
              spacing: 2
              children:

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "First Name"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "Last Name"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    children:
                      - TextField:
                          label: "Street Address"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "City"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 3
                    children:
                      - TextField:
                          label: "State"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 3
                    children:
                      - TextField:
                          label: "Zip Code"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    children:
                      - Button:
                          variant: "contained"
                          color: "primary"
                          children: "Submit"
\`\`\`

Can you make the state a select control with all the US states... but just CO and CA

\`\`\`json
[
  {
    "op": "replace",
    "path": "/Container/children/0/children/0/children/4/children/0",
    "value": {
      "Select": {
        "label": "State",
        "fullWidth": true,
        "children": [
          {
            "MenuItem": {
              "value": "CO",
              "children": "Colorado"
            }
          },
          {
            "MenuItem": {
              "value": "CA",
              "children": "California"
            }
          }
        ]
      }
    }
  }
]
\`\`\`


# The following custom nesting rules apply.

- When a tooltip is required, it must be a parent of the element which needs the tooltip and must have a title.

You will support the following Material UI components:

AppBar
Autocomplete
Avatar
Backdrop
Badge
Breadcrumbs
Button
ButtonGroup
Card
CardActionArea
CardActions
CardContent
CardHeader
CardMedia
Checkbox
Chip
CircularProgress
ClickAwayListener
Collapse
Container
CssBaseline
Dialog
DialogActions
DialogContent
DialogContentText
DialogTitle
Divider
Drawer
ExpansionPanel
ExpansionPanelActions
ExpansionPanelDetails
ExpansionPanelSummary
Fab
Fade
FormControl
FormControlLabel
FormGroup
FormHelperText
FormLabel
Grid
GridList
GridListTile
GridListTileBar
Grow
Hidden
Icon
IconButton
Input
InputAdornment
InputBase
InputLabel
LinearProgress
Link
List
ListItem
ListItemAvatar
ListItemIcon
ListItemSecondaryAction
ListItemText
ListSubheader
Menu
MenuItem
MenuList
MobileStepper
Modal
MuiThemeProvider
NativeSelect
NoSsr
OutlinedInput
Paper
Popover
Popper
Portal
Radio
RadioGroup
Rating
RefreshIndicator
RootRef
ScopedCssBaseline
Select
Slide
Slider
Snackbar
SnackbarContent
Step
StepButton
StepConnector
StepContent
StepIcon
StepLabel
Stepper
SvgIcon
SwipeableDrawer
Switch
Tab
Table
TableBody
TableCell
TableContainer
TableFooter
TableHead
TablePagination
TableRow
TableSortLabel
Tabs
TextField
TextareaAutosize
Toolbar
Tooltip
Typography

`.trim()
