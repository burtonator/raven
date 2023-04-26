
export type StepRef = Readonly<{
  Step: StepRefProperties
}>

export type StepRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  connector: any // Commented out: React.ReactElement
  disabled: boolean
  index: number
  last: boolean
  orientation: 'horizontal' | 'vertical'
}>