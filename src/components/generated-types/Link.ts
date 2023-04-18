
export type LinkRef = Readonly<{
  Link: LinkRefProperties
}>

export type LinkRefProperties = Readonly<{
  color: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error'
  component: any
  disabled: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  disableTouchRipple: boolean
  focusRipple: boolean
  focusVisibleClassName: string
  href: string
  onBlur: any
  onFocus: any
  onFocusVisible: any
  onKeyDown: any
  onKeyUp: any
  onMouseDown: any
  onMouseLeave: any
  onMouseUp: any
  onTouchEnd: any
  onTouchMove: any
  onTouchStart: any
  tabIndex: number
  TouchRippleProps: any
  underline: 'none' | 'hover' | 'always'
}>