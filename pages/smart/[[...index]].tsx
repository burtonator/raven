import {
  SmartNoteView,
  useSmartNoteRouterNotesStack
} from '@/src/components/SmartNoteView';
import {
  SmartNoteIndexProvider
} from '@/src/components/SmartNoteIndexProvider';
import { SmartNoteQuestion } from '@/src/components/SmartNoteQuestion';
import { Box } from '@mui/material';

export default function Index() {

  const path = useSmartNoteRouterNotesStack()

  if (path.length === 0) {
    return (
      <Box p={1} style={{display: 'flex', justifyContent: 'center'}}>
        <div sx={{ml: 'auto', mr: 'auto'}}>
          <SmartNoteQuestion/>
        </div>
      </Box>
    )
  }

  return (
    <SmartNoteIndexProvider>
      <SmartNoteView stack={path}/>
    </SmartNoteIndexProvider>
  )

}