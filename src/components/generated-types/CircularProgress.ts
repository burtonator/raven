
export type CircularProgressRef = Readonly<{
  CircularProgress: CircularProgressRefProperties
}>

export type CircularProgressRefProperties = Readonly<{
  color: 'primary' | 'secondary' | 'inherit'
  disableShrink: boolean
  size: number | string
  thickness: number
  value: number
  variant: 'determinate' | 'indeterminate' | 'static'
}>