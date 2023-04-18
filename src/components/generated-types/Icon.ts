
export type IconRef = Readonly<{
  Icon: IconRefProperties
}>

export type IconRefProperties = Readonly<{
  color: 'inherit' | 'primary' | 'secondary' | 'action' | 'error' | 'disabled'
  fontSize: 'inherit' | 'default' | 'small' | 'large'
}>