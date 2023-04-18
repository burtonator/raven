
export type TabRef = Readonly<{
  Tab: TabRefProperties
}>

export type TabRefProperties = Readonly<{
  disabled: boolean
  disableFocusRipple: boolean
  disableRipple: boolean
  fullWidth: boolean
  icon: string
  id: string
  indicator: any
  label: string
  value: any
  wrapped: boolean
}>