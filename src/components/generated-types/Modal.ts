
export type ModalRef = Readonly<{
  Modal: ModalRefProperties
}>

export type ModalRefProperties = Readonly<{
  BackdropComponent: any
  BackdropProps: any
  closeAfterTransition: boolean
  container: any
  disableAutoFocus: boolean
  disableBackdropClick: boolean
  disableEnforceFocus: boolean
  disableEscapeKeyDown: boolean
  disablePortal: boolean
  disableRestoreFocus: boolean
  disableScrollLock: boolean
  hideBackdrop: boolean
  keepMounted: boolean
  open: boolean
}>