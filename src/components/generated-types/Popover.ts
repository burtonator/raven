
export type PopoverRef = Readonly<{
  Popover: PopoverRefProperties
}>

export type PopoverRefProperties = Readonly<{
  anchorEl: HTMLElement | ((element: HTMLElement) => HTMLElement) | null
  anchorOrigin: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
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
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
  transitionDuration: number | { enter?: number, exit?: number } | 'auto'
}>