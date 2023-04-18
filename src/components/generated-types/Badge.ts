
export type BadgeRef = Readonly<{
  Badge: BadgeRefProperties
}>

export type BadgeRefProperties = Readonly<{
  anchorOrigin: {
    horizontal: 'left' | 'right'
    vertical: 'top' | 'bottom'
  }
  badgeContent: any
  color: 'default' | 'primary' | 'secondary' | 'error'
  invisible: boolean
  max: number
  overlap: 'rectangle' | 'circle'
  showZero: boolean
  variant: 'standard' | 'dot'
}>