
export type DrawerRef = Readonly<{
  Drawer: DrawerRefProperties
}>

export type DrawerRefProperties = Readonly<{
  anchor: 'left' | 'top' | 'right' | 'bottom'
  disableBackdropTransition: boolean
  disableDiscovery: boolean
  disablePortal: boolean
  disableRestoreFocus: boolean
  disableScrollLock: boolean
  hideBackdrop: boolean
  keepMounted: boolean
  open: boolean
  transitionDuration: number | { enter?: number, exit?: number }
  variant: 'permanent' | 'persistent' | 'temporary'
}>