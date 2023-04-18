
export type OutlinedInputRef = Readonly<{
  OutlinedInput: OutlinedInputRefProperties
}>

export type OutlinedInputRefProperties = Readonly<{
  autoComplete: string
  autoFocus: boolean
  defaultValue: any
  disabled: boolean
  error: boolean
  fullWidth: boolean
  id: string
  inputComponent: any
  inputProps: any
  label: string
  labelWidth: number
  margin: 'dense' | 'none' | 'normal'
  multiline: boolean
  name: string
  notched: boolean
  placeholder: string
  readOnly: boolean
  required: boolean
  rows: number
  rowsMax: number
  type: string
  value: any
}>