
export type StepperRef = Readonly<{
  Stepper: StepperRefProperties
}>

export type StepperRefProperties = Readonly<{
  activeStep: number
  alternativeLabel: boolean
  connector: any
  nonLinear: boolean
  orientation: 'horizontal' | 'vertical'
}>