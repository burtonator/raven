
export type ChipRef = Readonly<{
  Chip: ChipRefProperties
}>

export type ChipRefProperties = Readonly<{
  avatar: boolean
  clickable: boolean
  color: 'default' | 'primary' | 'secondary'
  deleteIcon: boolean
  disabled: boolean
  icon: boolean
  label: string
  onDelete: boolean
  size: 'small' | 'medium'
  variant: 'default' | 'outlined'
}>