import { SmartNote } from './SmartNote';
import { Meta } from '@storybook/react';
import {
  SmartNoteIndexProvider
} from './SmartNoteIndexProvider';
import { Divider } from '@mui/material';
import { SmartNoteView } from './SmartNoteView';

export default {
  component: SmartNote,
} as Meta

const Delegate = () => {
  return (
    <div style={{display: 'flex'}}>
      <SmartNote name="World War II"/>
      <Divider orientation='vertical'/>
      <SmartNote name="United States"/>
    </div>
  )
}

export const Basic = () => {
  return (
    <SmartNoteIndexProvider>
      <Delegate/>
    </SmartNoteIndexProvider>
  )
}

export const StandardUsageWithRoot = () => {
  return (
    <SmartNoteIndexProvider>
      <SmartNoteView root="World War II"/>
    </SmartNoteIndexProvider>
  )
}