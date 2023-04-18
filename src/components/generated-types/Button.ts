
export type ButtonRef = Readonly<{
  Button: ButtonRefProperties
}>

export type ButtonRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableElevation: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  fullWidth: boolean
  href: string
  size: 'small' | 'medium' | 'large'
  variant: 'text' | 'outlined' | 'contained'
}>