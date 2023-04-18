
export type PaperRef = Readonly<{
  Paper: PaperRefProperties
}>

export type PaperRefProperties = Readonly<{
  elevation: number
  square: boolean
  variant: 'elevation' | 'outlined'
}>