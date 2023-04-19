import dynamic from 'next/dynamic'

export default dynamic(() => import('../../src/components/AutoUI'), {
  ssr: false
})

// export default function Index() {
//   return (
//     <div>hello world</div>
//   )
// }