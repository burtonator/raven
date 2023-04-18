import {
  MaterialTypesGenerator
} from './MaterialTypesGenerator';
import fs from 'fs'

const components = `
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