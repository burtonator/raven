
export type StepRef = Readonly<{
  Step: StepRefProperties
}>

export type StepRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  disabled: boolean
  index: number
  last: boolean
  orientation: 'horizontal' | 'vertical'
}>