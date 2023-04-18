
export type TableRef = Readonly<{
  Table: TableRefProperties
}>

export type TableRefProperties = Readonly<{
  component: 'table' | 'caption' | 'colgroup' | 'col' | 'thead' | 'tbody' | 'tr' | 'th' | 'td'
  padding: 'default' | 'checkbox' | 'none'
  size: 'small' | 'medium'
  stickyHeader: boolean
}>