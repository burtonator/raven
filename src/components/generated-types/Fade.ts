
export type FadeRef = Readonly<{
  Fade: FadeRefProperties
}>

export type FadeRefProperties = Readonly<{
  appear: boolean
  in: boolean
  mountOnEnter: boolean
  timeout: number | { appear?: number; enter?: number; exit?: number }
  unmountOnExit: boolean
}>