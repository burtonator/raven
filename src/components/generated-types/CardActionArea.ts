
export type CardActionAreaRef = Readonly<{
  CardActionArea: CardActionAreaRefProperties
}>

export type CardActionAreaRefProperties = Readonly<{
  disableRipple: boolean
  disableTouchRipple: boolean
  focusHighlight: 'auto' | 'always' | 'never'
  focusVisibleClassName: string
}>