
export type RatingRef = Readonly<{
  Rating: RatingRefProperties
}>

export type RatingRefProperties = Readonly<{
  defaultValue: number
  disabled: boolean
  emptyIcon: boolean
  emptyLabelText: string
  getLabelText: (value: number) => string
  icon: boolean
  max: number
  name: string
  onChangeActive: (event: any, value: number) => void
  precision: number
  readOnly: boolean
  size: 'small' | 'medium' | 'large'
  value: number | null
}>