
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
  TouchRippleProps: any
  underline: 'none' | 'hover' | 'always'
}>