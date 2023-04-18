
export type StepLabelRef = Readonly<{
  StepLabel: StepLabelRefProperties
}>

export type StepLabelRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  disabled: boolean
  error: boolean
  icon: number | string
  last: boolean
  optional: boolean
  orientation: 'horizontal' | 'vertical'
}>