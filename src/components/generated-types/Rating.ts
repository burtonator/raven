
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
  precision: number | 'auto'
  readOnly: boolean
  size: 'small' | 'medium' | 'large'
  value: number | null
}>