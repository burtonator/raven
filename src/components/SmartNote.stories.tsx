import { NoteEntry, SmartNote } from './SmartNote';
import { Meta } from '@storybook/react';

export default {
  component: SmartNote,
} as Meta

const worldWarII: NoteEntry = {
  name: 'World War II',
  content: "hello world",
  items: [
    "United States"
  ]
}

export const Basic = () => {
  return <SmartNote entry={worldWarII}/>
}