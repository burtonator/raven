
export type TableCellRef = Readonly<{
  TableCell: TableCellRefProperties
}>

export type TableCellRefProperties = Readonly<{
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  component: string
  padding: 'default' | 'checkbox' | 'none'
  scope: string
  size: 'small' | 'medium'
  sortDirection: 'asc' | 'desc' | false
  variant: 'head' | 'body' | 'footer'
}>