
export type PortalRef = Readonly<{
  Portal: PortalRefProperties
}>

export type PortalRefProperties = Readonly<{
  container: HTMLElement | (() => HTMLElement) | null
}>