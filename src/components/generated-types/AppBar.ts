
export type AppBarRef = Readonly<{
  AppBar: AppBarRefProperties
}>

export type AppBarRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent'
  position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
  variant: 'regular' | 'dense'
}>