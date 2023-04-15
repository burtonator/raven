import dynamic from 'next/dynamic'

export default dynamic(() => import('../../src/components/GraphView'), {
  ssr: false
})