
export type AvatarRef = Readonly<{
  Avatar: AvatarRefProperties
}>

export type AvatarRefProperties = Readonly<{
  alt: string
  imgProps: any
  sizes: string
  src: string
  srcSet: string
  variant: 'circle' | 'rounded' | 'square'
}>