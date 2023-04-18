
export type ToolbarRef = Readonly<{
  Toolbar: ToolbarRefProperties
}>

export type ToolbarRefProperties = Readonly<{
  disableGutters: boolean
  variant: 'regular' | 'dense'
}>