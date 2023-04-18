
export type SelectRef = Readonly<{
  Select: SelectRefProperties
}>

export type SelectRefProperties = Readonly<{
  autoWidth: boolean
  displayEmpty: boolean
  // IconComponent: React.ElementType
  // input: React.ReactElement
  label: string
  labelId: string
  labelWidth: number
  // MenuProps: Partial<MenuRefProperties>
  multiple: boolean
  native: boolean
  // onClose: (event: React.SyntheticEvent) => void
  // onOpen: (event: React.SyntheticEvent) => void
  open: boolean
  // renderValue: (value: any) => React.ReactNode
  value: any
  variant: 'standard' | 'outlined' | 'filled'
}>