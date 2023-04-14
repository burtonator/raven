import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
  useSmartNoteIndex
} from '@/src/components/SmartNoteIndexProvider';
import { useSmartNoteRouter } from '@/src/components/SmartNoteQuestion';

export function Sidebar() {

  const [index] = useSmartNoteIndex()
  const router = useSmartNoteRouter()

  const defaultCreated = ''

  return (
    <List>
      {Object.entries(index)
             .sort((a, b) => (a[1].created ?? defaultCreated).localeCompare(b[1].created ?? defaultCreated))
             .reverse()
             .map((entry, index) => {
        const [key, value] = entry
        return (
          <ListItem key={key} disablePadding>
              <ListItemButton onClick={() => router.push(key)}>
              {/*<ListItemIcon>*/}
              {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
              {/*</ListItemIcon>*/}
              <ListItemText primary={value.name}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>

  )
}