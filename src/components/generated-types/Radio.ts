
export type RadioRef = Readonly<{
  Radio: RadioRefProperties
}>

export type RadioRefProperties = Readonly<{
  checked: boolean
  color: 'default' | 'primary' | 'secondary'
  disabled: boolean
  disableRipple: boolean
  // inputProps: InputHTMLAttributes<HTMLInputElement>
  name: string
  required: boolean
  value: any
}>