
export type CollapseRef = Readonly<{
  Collapse: CollapseRefProperties
}>

export type CollapseRefProperties = Readonly<{
  collapsedHeight: string
  in: boolean
  timeout: number | 'auto' | { enter?: number; exit?: number }
  unmountOnExit: boolean
}>