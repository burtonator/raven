
export type FormControlRef = Readonly<{
  FormControl: FormControlRefProperties
}>

export type FormControlRefProperties = Readonly<{
  disabled: boolean
  error: boolean
  fullWidth: boolean
  margin: 'none' | 'dense' | 'normal'
  required: boolean
  size: 'small' | 'medium'
  variant: 'standard' | 'outlined' | 'filled'
}>