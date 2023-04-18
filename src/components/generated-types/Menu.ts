
export type MenuRef = Readonly<{
  Menu: MenuRefProperties
}>

export type MenuRefProperties = Readonly<{
  anchorEl: HTMLElement | null
  anchorOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  anchorPosition: {
    top: number
    left: number
  }
  autoFocus: boolean
  disableAutoFocusItem: boolean
  elevation: number
  getContentAnchorEl: null
  keepMounted: boolean
  marginThreshold: number
  onClose: (event: React.SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  open: boolean
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  transitionDuration: number | { enter?: number, exit?: number }
}>