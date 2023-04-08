import { Meta } from '@storybook/react';
import { CodeEditor } from './CodeEditor';

export default {
  component: CodeEditor,
} as Meta

export const BasicCodeEditor = () => <CodeEditor defaultValue={""} language="typescript"/>
