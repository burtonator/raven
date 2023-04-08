import { Meta } from '@storybook/react';
import { MarkdownEditor } from './MarkdownEditor';

export default {
  component: MarkdownEditor,
} as Meta

export const BasicCodeEditor = () => <MarkdownEditor content={"This is some markdown"}/>



const markdownWithSourceCode = `

# Markdown With Source

This is some regular **markdown**


\`\`\`typescript
function hello() {
  console.log('hello world');
}  
\`\`\`

`.trim()

export const SourceCode = () => {
  return (
    <div style={{height: '100vh'}}>
      heere at least
      <MarkdownEditor content={markdownWithSourceCode}/>
    </div>
  )
}
