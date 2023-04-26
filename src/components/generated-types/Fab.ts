
export type FabRef = Readonly<{
  Fab: FabRefProperties
}>

export type FabRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  // endIcon: React.ReactElement
  fullWidth: boolean
  href: string
  size: 'small' | 'medium' | 'large'
  variant: 'round' | 'extended'
}>