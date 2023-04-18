
export type InputAdornmentRef = Readonly<{
  InputAdornment: InputAdornmentRefProperties
}>

export type InputAdornmentRefProperties = Readonly<{
  disablePointerEvents: boolean
  disableTypography: boolean
  position: 'start' | 'end'
  variant: 'standard' | 'outlined' | 'filled'
}>