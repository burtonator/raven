
export type ContainerRef = Readonly<{
  Container: ContainerRefProperties
}>

export type ContainerRefProperties = Readonly<{
  disableGutters: boolean
  fixed: boolean
  maxWidth: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>