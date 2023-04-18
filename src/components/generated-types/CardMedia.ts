
export type CardMediaRef = Readonly<{
  CardMedia: CardMediaRefProperties
}>

export type CardMediaRefProperties = Readonly<{
  component: string
  height: string | number
  image: string
  src: string
}>