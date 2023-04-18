
export type SnackbarRef = Readonly<{
  Snackbar: SnackbarRefProperties
}>

export type SnackbarRefProperties = Readonly<{
  action: any
  anchorOrigin: {
    horizontal: 'left' | 'center' | 'right'
    vertical: 'top' | 'bottom'
  }
  autoHideDuration: number
  // ContentProps: Partial<SnackbarContentRefProperties>
  disableWindowBlurListener: boolean
  key: any
  message: any
  onClose: any
  onMouseEnter: any
  onMouseLeave: any
  open: boolean
  resumeHideDuration: number
  TransitionComponent: any
  transitionDuration: number | { enter?: number; exit?: number }
  TransitionProps: any
}>