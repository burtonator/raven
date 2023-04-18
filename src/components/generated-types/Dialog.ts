
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
  scroll: 'body' | 'paper'
  transitionDuration: number | { enter?: number, exit?: number }
}>