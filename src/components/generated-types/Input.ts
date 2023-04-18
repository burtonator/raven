
export type InputRef = Readonly<{
  Input: InputRefProperties
}>

export type InputRefProperties = Readonly<{
  autoComplete: string
  autoFocus: boolean
  defaultValue: any
  disabled: boolean
  error: boolean
  fullWidth: boolean
  id: string
  inputComponent: any
  inputProps: any
  margin: 'dense' | 'none'
  multiline: boolean
  name: string
  placeholder: string
  readOnly: boolean
  required: boolean
  rows: number
  rowsMax: number
  type: string
  value: any
}>