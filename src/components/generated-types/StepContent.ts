
export type StepContentRef = Readonly<{
  StepContent: StepContentRefProperties
}>

export type StepContentRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  last: boolean
  optional: boolean
  orientation: 'horizontal' | 'vertical'
  transition: boolean
  transitionDuration: number | 'auto'
  TransitionComponent: any
  TransitionProps: any
}>