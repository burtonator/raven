
export type PopperRef = Readonly<{
  Popper: PopperRefProperties
}>

export type PopperRefProperties = Readonly<{
  anchorEl: null | HTMLElement | ((element: HTMLElement) => HTMLElement)
  container: HTMLElement | (() => HTMLElement) | null
  disablePortal: boolean
  keepMounted: boolean
  modifiers: Array<Partial<PopperJS.Modifier<any>>>
  open: boolean
  placement: PopperJS.Placement
  popperOptions: Partial<PopperJS.Options>
  popperRef: React.Ref<PopperJS>
  transition: boolean
}>