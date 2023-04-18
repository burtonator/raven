
export type DialogRef = Readonly<{
  Dialog: DialogRefProperties
}>

export type DialogRefProperties = Readonly<{
  disableBackdropClick: boolean
  disableEscapeKeyDown: boolean
  fullScreen: boolean
  fullWidth: boolean
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  open: boolean
  scroll: 'paper' | 'body'
  transitionDuration: number | { enter?: number; exit?: number }
}>