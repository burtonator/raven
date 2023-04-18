
export type TablePaginationRef = Readonly<{
  TablePagination: TablePaginationRefProperties
}>

export type TablePaginationRefProperties = Readonly<{
  ActionsComponent: any
  backIconButtonProps: any
  count: number
  labelDisplayedRows: (paginationInfo: { from: number; to: number; count: number }) => string
  labelRowsPerPage: string
  nextIconButtonProps: any
  onChangePage: (event: any, newPage: number) => void
  onChangeRowsPerPage: (event: any) => void
  page: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
}>