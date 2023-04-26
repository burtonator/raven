
export type ClickAwayListenerRef = Readonly<{
  ClickAwayListener: ClickAwayListenerRefProperties
}>

export type ClickAwayListenerRefProperties = Readonly<{
  // onClickAway: (event: React.MouseEvent<Document, MouseEvent> | React.TouchEvent<Document>) => void
  mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp' | false
  touchEvent: 'onTouchStart' | 'onTouchEnd' | false
}>