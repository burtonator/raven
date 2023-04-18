
export type MenuItemRef = Readonly<{
  MenuItem: MenuItemRefProperties
}>

export type MenuItemRefProperties = Readonly<{
  button: boolean
  dense: boolean
  disabled: boolean
  disableGutters: boolean
  divider: boolean
  focusVisibleClassName: string
  selected: boolean
}>