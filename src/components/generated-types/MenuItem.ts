
export type MenuItemRef = Readonly<{
  MenuItem: MenuItemRefProperties
}>

export type MenuItemRefProperties = Readonly<{
  autoFocus: boolean
  dense: boolean
  disabled: boolean
  disableGutters: boolean
  divider: boolean
  focusVisibleClassName: string
  role: string
  selected: boolean
}>