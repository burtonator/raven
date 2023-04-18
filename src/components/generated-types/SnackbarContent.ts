
export type SnackbarContentRef = Readonly<{
  SnackbarContent: SnackbarContentRefProperties
}>

export type SnackbarContentRefProperties = Readonly<{
  action: any
  message: any
  role: string
}>