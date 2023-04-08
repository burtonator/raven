import { NoteEntry, SmartNote } from './SmartNote';
import { Meta } from '@storybook/react';
import {
  SmartNoteIndexProvider
} from './SmartNoteIndexProvider';

export default {
  component: SmartNote,
} as Meta

export const Basic = () => {
  return (
    <SmartNoteIndexProvider>
      <SmartNote name="World War II"/>
    </SmartNoteIndexProvider>
  )
}