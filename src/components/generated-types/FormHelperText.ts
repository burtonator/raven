
export type FormHelperTextRef = Readonly<{
  FormHelperText: FormHelperTextRefProperties
}>

export type FormHelperTextRefProperties = Readonly<{
  disabled: boolean
  error: boolean
  filled: boolean
  focused: boolean
  margin: 'dense' | 'none'
  required: boolean
  variant: 'standard' | 'outlined' | 'filled'
}>