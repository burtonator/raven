import {ElementRef} from './generated-types/ElementRef'
import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  ImgHTMLAttributes
} from 'react';
import { Component } from 'react';
import {
  Box,
  AppBar,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Grow,
  Hidden,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  MobileStepper,
  Modal,
  NativeSelect,
  NoSsr,
  OutlinedInput,
  Paper,
  Popover,
  Popper,
  Portal,
  Radio,
  RadioGroup,
  Rating,
  ScopedCssBaseline,
  Select,
  Slide,
  Slider,
  Snackbar,
  SnackbarContent,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  SvgIcon,
  SwipeableDrawer,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  TextareaAutosize,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

export type ElementToComponentMap = {
  readonly [key in keyof ElementRef]: JSX.Element
}

const elementToComponentMap: ElementToComponentMap = {
  AppBar: AppBar,
  Autocomplete: Autocomplete,
  Avatar: Avatar,
  Backdrop: Backdrop,
  Badge: Badge,
  Breadcrumbs: Breadcrumbs,
  Button: Button,
  ButtonGroup: ButtonGroup,
  Card: Card,
  CardActionArea: CardActionArea,
  CardActions: CardActions,
  CardContent: CardContent,
  CardHeader: CardHeader,
  CardMedia: CardMedia,
  Checkbox: Checkbox,
  Box: Box,
  Chip: Chip,
  CircularProgress: CircularProgress,
  ClickAwayListener: ClickAwayListener,
  Collapse: Collapse,
  Container: Container,
  CssBaseline: CssBaseline,
  Dialog: Dialog,
  DialogActions: DialogActions,
  DialogContent: DialogContent,
  DialogContentText: DialogContentText,
  DialogTitle: DialogTitle,
  Divider: Divider,
  Drawer: Drawer,
  // ExpansionPanel: ExpansionPanel,
  // ExpansionPanelActions: ExpansionPanelActions,
  // ExpansionPanelDetails: ExpansionPanelDetails,
  // ExpansionPanelSummary: ExpansionPanelSummary,
  Fab: Fab,
  Fade: Fade,
  FormControl: FormControl,
  FormControlLabel: FormControlLabel,
  FormGroup: FormGroup,
  FormHelperText: FormHelperText,
  FormLabel: FormLabel,
  Grid: Grid,
  // GridList: GridList,
  // GridListTile: GridListTile,
  // GridListTileBar: GridListTileBar,
  Grow: Grow,
  Hidden: Hidden,
  Icon: Icon,
  IconButton: IconButton,
  Input: Input,
  InputAdornment: InputAdornment,
  InputBase: InputBase,
  InputLabel: InputLabel,
  LinearProgress: LinearProgress,
  Link: Link,
  List: List,
  ListItem: ListItem,
  ListItemAvatar: ListItemAvatar,
  ListItemIcon: ListItemIcon,
  ListItemSecondaryAction: ListItemSecondaryAction,
  ListItemText: ListItemText,
  ListSubheader: ListSubheader,
  Menu: Menu,
  MenuItem: MenuItem,
  MenuList: MenuList,
  MobileStepper: MobileStepper,
  Modal: Modal,
  // MuiThemeProvider: MuiThemeProvider,
  NativeSelect: NativeSelect,
  NoSsr: NoSsr,
  OutlinedInput: OutlinedInput,
  Paper: Paper,
  Popover: Popover,
  Popper: Popper,
  Portal: Portal,
  Radio: Radio,
  RadioGroup: RadioGroup,
  Rating: Rating,
  // RefreshIndicator: RefreshIndicator,
  // RootRef: RootRef,
  ScopedCssBaseline: ScopedCssBaseline,
  Select: Select,
  Slide: Slide,
  Slider: Slider,
  Snackbar: Snackbar,
  SnackbarContent: SnackbarContent,
  Step: Step,
  StepButton: StepButton,
  StepConnector: StepConnector,
  StepContent: StepContent,
  StepIcon: StepIcon,
  StepLabel: StepLabel,
  Stepper: Stepper,
  SvgIcon: SvgIcon,
  SwipeableDrawer: SwipeableDrawer,
  Switch: Switch,
  Tab: Tab,
  Table: Table,
  TableBody: TableBody,
  TableCell: TableCell,
  TableContainer: TableContainer,
  TableFooter: TableFooter,
  TableHead: TableHead,
  TablePagination: TablePagination,
  TableRow: TableRow,
  TableSortLabel: TableSortLabel,
  Tabs: Tabs,
  TextField: TextField,
  TextareaAutosize: TextareaAutosize,
  Toolbar: Toolbar,
  Tooltip: Tooltip,
  Typography: Typography,

  // standard element mapping
  // TODO: more standard element mapping... FIXME this won't work though because 'div' won't handle the children properly..
  div: (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => <div {...props}/>,
  img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => <img {...props}/>,
  span: (props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => <span {...props}/>,
  form: (props: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>) => <span {...props}/>,
}
const NotImplemented = () => {
  return (
    <div>Not implemented</div>
  )
}

type Primitive = string | number | boolean

function isPrimitiveTypeGuard(val: any): val is Primitive {
  const t = typeof val
  return t === 'string' || t === 'number' || t === 'boolean'
}

function isArrayTypeGuard(val: any): val is ReadonlyArray<Primitive | ElementRef> {
  return Array.isArray(val)
}

export function AutoUIRenderer(props: ElementRef) {

  // get the element and map it to a component...

  const elementName = Object.keys(props)[0]

  if (! elementName) {
    return null
  }

  const Component = elementToComponentMap[elementName] ?? <div>Not implemented: {elementName} </div>

  const componentProps = {...(props[elementName] ?? {})}

  const children = [...(componentProps.children ?? [])]

  delete componentProps.children

  return (
    <Component {...componentProps}>

      {isPrimitiveTypeGuard(children) && <>{children}</>}

      {isArrayTypeGuard(children) && children.map((child, idx) => (
        <Fragment key={idx}>
          {isPrimitiveTypeGuard(child) && <>{child}</>}
          {! isPrimitiveTypeGuard(child) && <AutoUIRenderer {...child}/>}
        </Fragment>
      ))}
    </Component>
  )

}
