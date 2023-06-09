
export type IconButtonRef = Readonly<{
  IconButton: IconButtonRefProperties
}>

export type IconButtonRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  edge: 'start' | 'end' | false
  size: 'small' | 'medium'
}>