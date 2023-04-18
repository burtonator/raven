
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
  onClose: (event: React.SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  open: boolean
  PaperComponent: React.ComponentType
  // PaperProps: Partial<PaperRefProperties>
  role: string
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  TransitionComponent: React.ComponentType
  transitionDuration: number | { enter?: number, exit?: number }
  TransitionProps: Partial<TransitionRefProperties>
}>