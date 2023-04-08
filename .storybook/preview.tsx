import type { Preview } from "@storybook/react";
import MaterialApp from '../src/components/MaterialApp';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


const withMui = (Story, context) => {
  return (
    <MaterialApp>
      <Story {...context} />
    </MaterialApp>
  )
}


export const decorators = [
  withMui
]

export default preview;
