
export type LinkRef = Readonly<{
  Link: LinkRefProperties
}>

export type LinkRefProperties = Readonly<{
  color: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error'
  component: any
  disabled: boolean
  href: string
  underline: 'none' | 'hover' | 'always'
}>