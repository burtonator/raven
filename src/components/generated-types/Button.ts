
export type ButtonRef = Readonly<{
  Button: ButtonRefProperties
}>

export type ButtonRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableElevation: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  // endIcon: React.ReactElement
  fullWidth: boolean
  href: string
  // onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  size: 'small' | 'medium' | 'large'
  // startIcon: React.ReactElement
  variant: 'text' | 'outlined' | 'contained'
}>