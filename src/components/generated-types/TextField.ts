
export type TextFieldRef = Readonly<{
  TextField: TextFieldRefProperties
}>

export type TextFieldRefProperties = Readonly<{
  autoComplete: string
  autoFocus: boolean
  color: 'primary' | 'secondary'
  defaultValue: any
  disabled: boolean
  error: boolean
  fullWidth: boolean
  helperText: string
  id: string
  label: string
  margin: 'none' | 'dense' | 'normal'
  multiline: boolean
  name: string
  placeholder: string
  required: boolean
  rows: number | string
  rowsMax: number | string
  select: boolean
  size: 'small' | 'medium'
  type: string
  value: any
  variant: 'standard' | 'outlined' | 'filled'
}>