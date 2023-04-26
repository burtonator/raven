
export type TypographyRef = Readonly<{
  Typography: TypographyRefProperties
}>

export type TypographyRefProperties = Readonly<{
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  color: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error'
  display: 'initial' | 'block' | 'inline'
  gutterBottom: boolean
  noWrap: boolean
  paragraph: boolean
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit'
  variantMapping: {
    h1: string
    h2: string
    h3: string
    h4: string
    h5: string
    h6: string
    subtitle1: string
    subtitle2: string
    body1: string
    body2: string
    caption: string
    button: string
    overline: string
  }
}>