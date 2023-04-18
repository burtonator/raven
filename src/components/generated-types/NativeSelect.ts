
export type NativeSelectRef = Readonly<{
  NativeSelect: NativeSelectRefProperties
}>

export type NativeSelectRefProperties = Readonly<{
  autoWidth: boolean
  disabled: boolean
  // IconComponent: React.ElementType
  // input: React.ReactElement
  label: string
  labelId: string
  labelWidth: number
  multiple: boolean
  native: boolean
  // onChange: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void
  value: any
  variant: 'standard' | 'outlined' | 'filled'
}>