
export type BreadcrumbsRef = Readonly<{
  Breadcrumbs: BreadcrumbsRefProperties
}>

export type BreadcrumbsRefProperties = Readonly<{
  expandText: string
  itemsAfterCollapse: number
  itemsBeforeCollapse: number
  maxItems: number
  separator: string
}>