
export type AutocompleteRef = Readonly<{
  Autocomplete: AutocompleteRefProperties
}>

export type AutocompleteRefProperties = Readonly<{
  autoHighlight: boolean
  autoSelect: boolean
  blurOnSelect: boolean | 'touch'
  clearOnBlur: boolean
  clearOnEscape: boolean
  debug: boolean
  defaultValue: any
  disableClearable: boolean
  disableCloseOnSelect: boolean
  disableListWrap: boolean
  disableOpenOnFocus: boolean
  disablePortal: boolean
  filterOptions: (options: any[], state: any) => any[]
  filterSelectedOptions: boolean
  forcePopupIcon: boolean | 'auto'
  freeSolo: boolean
  fullWidth: boolean
  getOptionDisabled: (option: any) => boolean
  getOptionLabel: (option: any) => string
  getOptionSelected: (option: any, value: any) => boolean
  groupBy: (option: any) => string
  handleHomeEndKeys: boolean
  id: string
  includeInputInList: boolean
  inputValue: string
  limitTags: number
  loading: boolean
  loadingText: string
  multiple: boolean
  noOptionsText: string
  open: boolean
  openOnFocus: boolean
  openText: string
  options: any[]
  pageSize: number
  popupIcon: boolean | 'auto'
  renderGroup: (params: any) => JSX.Element
  renderInput: (params: any) => JSX.Element
  renderOption: (option: any, state: any) => JSX.Element
  renderTags: (value: any[], getTagProps: any) => JSX.Element[]
  selectOnFocus: boolean
  size: 'small' | 'medium'
  value: any
}>