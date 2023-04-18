
export type TextareaAutosizeRef = Readonly<{
  TextareaAutosize: TextareaAutosizeRefProperties
}>

export type TextareaAutosizeRefProperties = Readonly<{
  maxRows: number
  minRows: number
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string | number
}>