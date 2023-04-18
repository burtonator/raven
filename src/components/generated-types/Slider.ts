
export type SliderRef = Readonly<{
  Slider: SliderRefProperties
}>

export type SliderRefProperties = Readonly<{
  'aria-labelledby': string
  'aria-valuetext': string
  color: 'primary' | 'secondary'
  defaultValue: number | number[]
  disabled: boolean
  getAriaLabel: (index: number) => string
  getAriaValueText: (value: number, index: number) => string
  marks: boolean | SliderMark[]
  max: number
  min: number
  name: string
  onChangeCommitted: (event: any, value: number | number[]) => void
  onChange: (event: any, value: number | number[]) => void
  orientation: 'horizontal' | 'vertical'
  scale: (value: number) => number
  step: number | null
  track: 'normal' | 'inverted' | false
  value: number | number[]
  valueLabelDisplay: 'auto' | 'on' | 'off'
  valueLabelFormat: string | ((value: number, index: number) => string)
}>

export type SliderMark = Readonly<{
  value: number
  label?: string
}>