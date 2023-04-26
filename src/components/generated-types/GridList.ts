
export type GridListRef = Readonly<{
  GridList: GridListRefProperties
}>

export type GridListRefProperties = Readonly<{
  cellHeight: number | 'auto'
  cols: number
  spacing: number
}>