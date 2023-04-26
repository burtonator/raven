
export type MobileStepperRef = Readonly<{
  MobileStepper: MobileStepperRefProperties
}>

export type MobileStepperRefProperties = Readonly<{
  activeStep: number
  backButton: any
  linearProgressProps: any
  nextButton: any
  position: 'bottom' | 'top' | 'static'
  steps: number
  variant: 'text' | 'dots' | 'progress'
}>