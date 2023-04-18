
export type TooltipRef = Readonly<{
  Tooltip: TooltipRefProperties
}>

export type TooltipRefProperties = Readonly<{
  arrow: boolean
  disableFocusListener: boolean
  disableHoverListener: boolean
  disableTouchListener: boolean
  enterDelay: number
  enterNextDelay: number
  enterTouchDelay: number
  followCursor: boolean
  id: string
  interactive: boolean
  leaveDelay: number
  leaveTouchDelay: number
  open: boolean
  placement: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top'
  title: string
  TransitionComponent: any
  transitionDuration: number | { enter?: number, exit?: number }
  TransitionProps: any
}>