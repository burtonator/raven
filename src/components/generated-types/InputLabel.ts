
export type InputLabelRef = Readonly<{
  InputLabel: InputLabelRefProperties
}>

export type InputLabelRefProperties = Readonly<{
  disableAnimation: boolean
  disabled: boolean
  error: boolean
  focused: boolean
  margin: 'dense' | 'none'
  required: boolean
  shrink: boolean
  variant: 'standard' | 'outlined' | 'filled'
}>