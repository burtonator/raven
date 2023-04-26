
export type SliderRef = Readonly<{
  Slider: SliderRefProperties
}>

export type SliderRefProperties = Readonly<{
  defaultValue: number | number[]
  disabled: boolean
  getAriaLabel: (index: number) => string
  getAriaValueText: (value: number, index: number) => string
  marks: boolean | SliderMark[]
  max: number
  min: number
  name: string
  orientation: 'horizontal' | 'vertical'
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
