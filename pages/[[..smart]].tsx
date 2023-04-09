import {
  SmartNoteView,
  useSmartNoteRouter
} from '@/src/components/SmartNoteView';

export default function Smart() {

  const path = useSmartNoteRouter()
  return (
    <SmartNoteView stack={path}/>
  )

}