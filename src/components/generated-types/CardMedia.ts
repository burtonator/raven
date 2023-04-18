
export type CardMediaRef = Readonly<{
  CardMedia: CardMediaRefProperties
}>

export type CardMediaRefProperties = Readonly<{
  aspectRatio: 'auto' | '1:1' | '4:3' | '16:9'
  image: string
  src: string
}>