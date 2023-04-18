
export type ButtonGroupRef = Readonly<{
  ButtonGroup: ButtonGroupRefProperties
}>

export type ButtonGroupRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableElevation: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  fullWidth: boolean
  orientation: 'horizontal' | 'vertical'
  size: 'small' | 'medium' | 'large'
  variant: 'text' | 'outlined' | 'contained'
}>