
export type PopoverRef = Readonly<{
  Popover: PopoverRefProperties
}>

export type PopoverRefProperties = Readonly<{
  anchorEl: HTMLElement | null
  anchorOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  anchorPosition: {
    top: number
    left: number
  }
  anchorReference: 'anchorEl' | 'anchorPosition' | 'none'
  elevation: number
  getContentAnchorEl: null
  marginThreshold: number
  modal: boolean
  open: boolean
  // PaperProps: Partial<PaperRefProperties>
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  transitionDuration: number | { enter?: number, exit?: number }
  // TransitionComponent: React.ComponentType
  // TransitionProps: Partial<TransitionRefProperties>
}>