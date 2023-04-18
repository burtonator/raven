
export type StepButtonRef = Readonly<{
  StepButton: StepButtonRefProperties
}>

export type StepButtonRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  disabled: boolean
  expanded: boolean
  icon: any
  last: boolean
  optional: any
  orientation: 'horizontal' | 'vertical'
}>