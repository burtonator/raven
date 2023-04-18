
export type SnackbarContentRef = Readonly<{
  SnackbarContent: SnackbarContentRefProperties
}>

export type SnackbarContentRefProperties = Readonly<{
  action: any
  message: any
  variant: 'default' | 'error' | 'info' | 'success' | 'warning'
}>