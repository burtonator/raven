
export type RefreshIndicatorRef = Readonly<{
  RefreshIndicator: RefreshIndicatorRefProperties
}>

export type RefreshIndicatorRefProperties = Readonly<{
  color: 'primary' | 'secondary' | 'inherit'
  left: number
  size: number | string
  status: 'ready' | 'loading' | 'hide'
  top: number
}>