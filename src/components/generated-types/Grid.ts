
export type GridRef = Readonly<{
  Grid: GridRefProperties
}>

export type GridRefProperties = Readonly<{
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  alignContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch'
  container: boolean
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  item: boolean
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  spacing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  zeroMinWidth: boolean
  xs: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  sm: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  md: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  lg: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xl: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}>