import { Meta } from '@storybook/react';
import { MarkdownViewer } from './MarkdownViewer';

export default {
  component: MarkdownViewer,
} as Meta

export const BasicCodeEditor = () => <MarkdownViewer content={"This is some markdown"}/>

const markdownWithSourceCode = `
Sure, here's an example of a simple React component written in Typescript:

\`\`\`typescript
import React, { FC } from 'react';

interface Props {
  name: string;
}

const Greeting: FC<Props> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
\`\`\`

In this example, we define a functional component called \`Greeting\`. It takes in a single prop \`name\` of type \`string\`. We use the \`FC\` (FunctionComponent) type from React to define the component type.

Inside the component, we return a simple \`<div>\` element that displays the greeting message with the \`name\` prop passed into it.

Finally, we export the component as the default export so it can be used in other parts of the application.
`.trim()

export const SourceCode = () => {
  return (
    <div style={{height: '100vh'}}>
      <MarkdownViewer content={markdownWithSourceCode}/>
    </div>
  )
}
