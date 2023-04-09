import {
  SmartNoteView,
  useSmartNoteRouter
} from '@/src/components/SmartNoteView';
import {
  SmartNoteIndexProvider
} from '@/src/components/SmartNoteIndexProvider';

export default function Smart() {

  const path = useSmartNoteRouter()
  return (
    <SmartNoteIndexProvider>
      <SmartNoteView stack={path}/>
    </SmartNoteIndexProvider>
  )

}