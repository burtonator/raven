
export type ToolbarRef = Readonly<{
  Toolbar: ToolbarRefProperties
}>

export type ToolbarRefProperties = Readonly<{
  disableGutters: boolean
  edge: 'start' | 'end' | false
  variant: 'regular' | 'dense'
}>