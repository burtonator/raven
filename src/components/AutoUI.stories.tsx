import { Meta } from '@storybook/react';
import { AutoUI } from './AutoUI';
import YAML from 'yaml';

export default {
  component: AutoUI,
} as Meta

const yaml = `
Button: 
  color: primary
  children: Click Me  
  
`

export const BasicButton = () => {

  const props = YAML.parse(yaml)

  return (
    <AutoUI {...props}/>
  )
}
