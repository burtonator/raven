
export type SwipeableDrawerRef = Readonly<{
  SwipeableDrawer: SwipeableDrawerRefProperties
}>

export type SwipeableDrawerRefProperties = Readonly<{
  anchor: 'left' | 'top' | 'right' | 'bottom'
  disableBackdropTransition: boolean
  disableDiscovery: boolean
  disableSwipeToOpen: boolean
  hysteresis: number
  minFlingVelocity: number
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void
  onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void
  open: boolean
  // SwipeAreaProps: Partial<SwipeAreaRefProperties>
  swipeAreaWidth: number
  transitionDuration: number | { enter?: number; exit?: number }
}>