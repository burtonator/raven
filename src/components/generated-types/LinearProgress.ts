
export type LinearProgressRef = Readonly<{
  LinearProgress: LinearProgressRefProperties
}>

export type LinearProgressRefProperties = Readonly<{
  color: 'primary' | 'secondary'
  value: number
  valueBuffer: number
  variant: 'determinate' | 'indeterminate' | 'buffer' | 'query'
}>