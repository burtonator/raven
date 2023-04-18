
export type BackdropRef = Readonly<{
  Backdrop: BackdropRefProperties
}>

export type BackdropRefProperties = Readonly<{
  invisible: boolean
  open: boolean
  // transitionDuration: number | { appear?: number, enter?: number, exit?: number }
}>