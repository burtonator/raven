
export type SlideRef = Readonly<{
  Slide: SlideRefProperties
}>

export type SlideRefProperties = Readonly<{
  direction: 'left' | 'right' | 'up' | 'down'
  in: boolean
  // onEnter: (node: HTMLElement) => void
  // onEntered: (node: HTMLElement) => void
  // onEntering: (node: HTMLElement) => void
  // onExit: (node: HTMLElement) => void
  // onExited: (node: HTMLElement) => void
  // onExiting: (node: HTMLElement) => void
  timeout: number | { enter?: number, exit?: number }
}>