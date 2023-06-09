
export type TableBodyRef = Readonly<{
  TableBody: TableBodyRefProperties
}>

export type TableBodyRefProperties = Readonly<{
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>
}>