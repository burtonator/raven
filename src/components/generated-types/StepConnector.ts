
export type StepConnectorRef = Readonly<{
  StepConnector: StepConnectorRefProperties
}>

export type StepConnectorRefProperties = Readonly<{
  active: boolean
  alternativeLabel: boolean
  completed: boolean
  disabled: boolean
  index: number
  orientation: 'horizontal' | 'vertical'
}>