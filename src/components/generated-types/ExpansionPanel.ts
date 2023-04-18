
export type ExpansionPanelRef = Readonly<{
  ExpansionPanel: ExpansionPanelRefProperties
}>

export type ExpansionPanelRefProperties = Readonly<{
  defaultExpanded: boolean
  disabled: boolean
  expanded: boolean
  square: boolean
  TransitionComponent: any
  TransitionProps: any
}>