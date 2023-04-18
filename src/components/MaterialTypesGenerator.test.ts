import {
  MaterialTypesGenerator
} from './MaterialTypesGenerator';
import fs from 'fs'

const components = `
Button
Typography
TextField
AppBar
Toolbar
IconButton
Grid
Card
List
Drawer
Checkbox
Radio
Select
MenuItem
Dialog
Snackbar
Tooltip
CircularProgress
Table
FormControl
FormGroup
InputLabel
Input
FormControlLabel
ListItem
ListItemText
ListItemIcon
ListItemSecondaryAction
Paper
Tabs
Tab
Switch
Slider
Badge
Breadcrumbs
Chip
Divider
Fab
IconButton
Link
Menu
Popover
Stepper
Step
StepLabel
StepContent
SwipeableDrawer
TextField
`.trim().split('\n')

describe('MaterialTypesGenerator', function() {

  it('generate', async () => {

    interface GeneratedComponentOutput {
      readonly component: string
      readonly raw: string
      readonly content: string | undefined
    }

    async function doGenerate(component: string): Promise<GeneratedComponentOutput> {

      console.log('component: ' + component)

      const generated = await MaterialTypesGenerator.generate(component)
      return {
        component,
        content: generated?.code,
        raw: generated?.raw ?? ''
      }

    }

    async function doWrite(output: GeneratedComponentOutput) {
      const dir = `/Users/burton/projects/raven/src/components/generated-types/`

      //fs.writeFileSync(`${dir}/${output.component}.raw.txt`, Buffer.from(output.raw))

      if (output.content) {
        fs.writeFileSync(`${dir}/${output.component}.ts`, Buffer.from(output.content))
      } else {
        throw new Error("No content for component: " + output.component)
      }

    }

    const generated = await Promise.all(components.map(doGenerate))
    await Promise.all(generated.map(doWrite))

  }, 300000);

})