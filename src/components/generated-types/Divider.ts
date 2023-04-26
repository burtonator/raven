
export type DividerRef = Readonly<{
  Divider: DividerRefProperties
}>

export type DividerRefProperties = Readonly<{
  absolute: boolean
  flexItem: boolean
  light: boolean
  orientation: 'horizontal' | 'vertical'
  textAlign: 'left' | 'right' | 'center'
  variant: 'fullWidth' | 'inset' | 'middle'
}>