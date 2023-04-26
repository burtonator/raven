
export type PopperRef = Readonly<{
  Popper: PopperRefProperties
}>

export type PopperRefProperties = Readonly<{
  anchorEl: null | HTMLElement | ((element: HTMLElement) => HTMLElement)
  container: HTMLElement | (() => HTMLElement) | null
  disablePortal: boolean
  keepMounted: boolean
  open: boolean
  placement: PopperPlacement
  transition: boolean
}>

export enum PopperPlacement {
  BottomEnd = 'bottom-end',
  BottomStart = 'bottom-start',
  Bottom = 'bottom',
  LeftEnd = 'left-end',
  LeftStart = 'left-start',
  Left = 'left',
  RightEnd = 'right-end',
  RightStart = 'right-start',
  Right = 'right',
  TopEnd = 'top-end',
  TopStart = 'top-start',
  Top = 'top'
}