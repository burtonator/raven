
export type NativeSelectRef = Readonly<{
  NativeSelect: NativeSelectRefProperties
}>

export type NativeSelectRefProperties = Readonly<{
  autoWidth: boolean
  disabled: boolean
  IconComponent: React.ElementType
  input: React.ReactElement
  label: string
  labelId: string
  labelWidth: number
  multiple: boolean
  native: boolean
  onClose: (event: React.SyntheticEvent) => void
  onOpen: (event: React.SyntheticEvent) => void
  open: boolean
  renderValue: (value: any) => React.ReactNode
  value: any
  variant: 'standard' | 'outlined' | 'filled'
}>