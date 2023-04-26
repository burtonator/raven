
export type GridRef = Readonly<{
  Grid: GridRefProperties
}>

export type GridRefProperties = Readonly<{
  alignContent: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  container: boolean
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  item: boolean
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  lg: boolean | number | 'auto' | 'true' | 'false'
  md: boolean | number | 'auto' | 'true' | 'false'
  sm: boolean | number | 'auto' | 'true' | 'false'
  spacing: number
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  xl: boolean | number | 'auto' | 'true' | 'false'
  xs: boolean | number | 'auto' | 'true' | 'false'
  zeroMinWidth: boolean
}>