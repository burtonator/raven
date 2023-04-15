import dynamic from 'next/dynamic'

export default dynamic(() => import('../../../src/components/SmartHome'), {
  ssr: false
})