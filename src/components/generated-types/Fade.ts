
export type FadeRef = Readonly<{
  Fade: FadeRefProperties
}>

export type FadeRefProperties = Readonly<{
  appear: boolean
  enter: boolean
  exit: boolean
  in: boolean
  // onEnter: (node: HTMLElement, isAppearing: boolean) => void
  // onEntered: (node: HTMLElement, isAppearing: boolean) => void
  // onEntering: (node: HTMLElement, isAppearing: boolean) => void
  // onExit: (node: HTMLElement) => void
  // onExited: (node: HTMLElement) => void
  // onExiting: (node: HTMLElement) => void
  timeout: number | { appear?: number, enter?: number, exit?: number }
}>