
export type TableContainerRef = Readonly<{
  TableContainer: TableContainerRefProperties
}>

export type TableContainerRefProperties = Readonly<{
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>
}>