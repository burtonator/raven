
export type SvgIconRef = Readonly<{
  SvgIcon: SvgIconRefProperties
}>

export type SvgIconRefProperties = Readonly<{
  color: 'inherit' | 'primary' | 'secondary' | 'action' | 'error' | 'disabled'
  fontSize: 'inherit' | 'default' | 'small' | 'large'
  shapeRendering: string
  titleAccess: string
  viewBox: string
}>