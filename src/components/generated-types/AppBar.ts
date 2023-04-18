
export type AppBarRef = Readonly<{
  AppBar: AppBarRefProperties
}>

export type AppBarRefProperties = Readonly<{
  color: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent'
  elevation: number
  position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
  square: boolean
}>