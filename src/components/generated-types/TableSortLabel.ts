
export type TableSortLabelRef = Readonly<{
  TableSortLabel: TableSortLabelRefProperties
}>

export type TableSortLabelRefProperties = Readonly<{
  active: boolean
  direction: 'asc' | 'desc'
  hideSortIcon: boolean
  // IconComponent: React.ElementType
}>