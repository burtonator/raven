
export type SwitchRef = Readonly<{
  Switch: SwitchRefProperties
}>

export type SwitchRefProperties = Readonly<{
  checked: boolean
  color: 'default' | 'primary' | 'secondary'
  disabled: boolean
  disableRipple: boolean
  edge: 'start' | 'end' | false
  inputProps: Readonly<{ [key: string]: any }>
  name: string
  required: boolean
  tabIndex: number
  value: any
}>