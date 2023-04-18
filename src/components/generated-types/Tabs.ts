
export type TabsRef = Readonly<{
  Tabs: TabsRefProperties
}>

export type TabsRefProperties = Readonly<{
  action: (actions: TabsActions) => void
  centered: boolean
  indicatorColor: 'secondary' | 'primary'
  onChange: (event: React.ChangeEvent<{}>, value: any) => void
  orientation: 'horizontal' | 'vertical'
  scrollButtons: 'auto' | 'desktop' | 'on' | 'off'
  selectionFollowsFocus: boolean
  textColor: 'secondary' | 'primary' | 'inherit'
  value: any
  variant: 'standard' | 'scrollable' | 'fullWidth'
}>

export interface TabsActions {
  updateIndicator: () => void
  updateScrollButtons: () => void
}