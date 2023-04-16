import { Meta } from '@storybook/react';
import { ChatJS } from './ChatJS';

export default {
  component: ChatJS,
} as Meta

export const Basic = () => {
  return (
    <>
      <ChatJS />
    </>
  )
}
