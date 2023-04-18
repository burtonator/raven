
export type CheckboxRef = Readonly<{
  Checkbox: CheckboxRefProperties
}>

export type CheckboxRefProperties = Readonly<{
  checked: boolean
  color: 'default' | 'primary' | 'secondary'
  disabled: boolean
  disableRipple: boolean
  edge: 'start' | 'end' | false
  indeterminate: boolean
  inputProps: any
  name: string
  required: boolean
  value: any
}>