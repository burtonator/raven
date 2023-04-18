
export type SwitchRef = Readonly<{
  Switch: SwitchRefProperties
}>

export type SwitchRefProperties = Readonly<{
  checked: boolean
  color: 'default' | 'primary' | 'secondary'
  disabled: boolean
  disableRipple: boolean
  edge: 'start' | 'end' | false
  // icon: React.ReactElement
  // checkedIcon: React.ReactElement
  inputProps: any
  name: string
  required: boolean
  tabIndex: number
  value: any
}>