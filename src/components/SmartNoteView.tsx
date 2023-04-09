import { SmartNote } from './SmartNote';
import { Divider } from '@mui/material';
import { CSSProperties, useState } from 'react';
import {
  NoteNameStr
} from './SmartNoteIndexProvider';

import {Fragment} from 'react'

interface SmartNoteViewProps {
  readonly root: NoteNameStr
  readonly style?: CSSProperties
}

export function SmartNoteView(props: SmartNoteViewProps) {

  const [stack, setStack] = useState<ReadonlyArray<NoteNameStr>>([props.root])

  return (
    <div style={{...props.style, display: 'flex'}}>

      {stack.map((current, index) => {
          return (
            <Fragment key={current}>

              {current > 0 && (
                <Divider orientation='vertical'/>
              )}

              <SmartNote name={current}/>
            </Fragment>
          );
        }
      )}
      {/*<SmartNote name="World War II"/>*/}
      {/*<SmartNote name="United States"/>*/}
    </div>
  )

}