import { Meta } from '@storybook/react';
import { CodeEditor } from './CodeEditor';
import MaterialApp from './MaterialApp';

export default {
  component: CodeEditor,
} as Meta

export const BasicCodeEditor = () => {
  return (
    <>
      <CodeEditor defaultValue={"function hello() {}"}
                  language="typescript"/>
    </>
  )
}
