
export type GrowRef = Readonly<{
  Grow: GrowRefProperties
}>

export type GrowRefProperties = Readonly<{
  in: boolean
  mountOnEnter: boolean
  unmountOnExit: boolean
  timeout: number | 'auto' | { appear?: number, enter?: number, exit?: number }
}>