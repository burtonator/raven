
export type HiddenRef = Readonly<{
  Hidden: HiddenRefProperties
}>

export type HiddenRefProperties = Readonly<{
  implementation: 'js' | 'css'
  initialWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  lgDown: boolean
  lgUp: boolean
  mdDown: boolean
  mdUp: boolean
  only: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'>
  smDown: boolean
  smUp: boolean
  xlDown: boolean
  xlUp: boolean
  xsDown: boolean
  xsUp: boolean
}>