import { SmartNote } from './SmartNote';
import { Meta } from '@storybook/react';
import {
  SmartNoteIndexProvider
} from './SmartNoteIndexProvider';

export default {
  component: SmartNote,
} as Meta

const Delegate = () => {
  return (
    <SmartNote name="World War II"/>
  )
}

export const Basic = () => {
  return (
    <SmartNoteIndexProvider>
      <Delegate/>
    </SmartNoteIndexProvider>
  )
}