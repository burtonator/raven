
export type ListItemRef = Readonly<{
  ListItem: ListItemRefProperties
}>

export type ListItemRefProperties = Readonly<{
  alignItems: 'flex-start' | 'center'
  autoFocus: boolean
  button: boolean
  dense: boolean
  disabled: boolean
  disableGutters: boolean
  divider: boolean
  focusVisibleClassName: string
  selected: boolean
}>