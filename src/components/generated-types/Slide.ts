
export type SlideRef = Readonly<{
  Slide: SlideRefProperties
}>

export type SlideRefProperties = Readonly<{
  direction: 'left' | 'right' | 'up' | 'down'
  in: boolean
  timeout: number | { enter?: number, exit?: number }
}>