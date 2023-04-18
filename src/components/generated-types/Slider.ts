
export type SliderRef = Readonly<{
  Slider: SliderRefProperties
}>

export type SliderRefProperties = Readonly<{
  defaultValue: number | number[]
  disabled: boolean
  getAriaLabel: (index: number) => string
  getAriaValueText: (value: number, index: number) => string
  marks: boolean | Array<{ value: number; label?: string }>
  max: number
  min: number
  name: string
  onChangeCommitted: (event: any, value: number | number[]) => void
  orientation: 'horizontal' | 'vertical'
  step: number | null
  track: 'normal' | 'inverted' | false
  value: number | number[]
  valueLabelDisplay: 'auto' | 'on' | 'off'
  valueLabelFormat: string | ((value: number, index: number) => string)
}>