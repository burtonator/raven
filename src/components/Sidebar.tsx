import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
  useSmartNoteContext,
  useSmartNoteIndex
} from '@/src/components/SmartNoteIndexProvider';
import { useSmartNoteRouter } from '@/src/components/SmartNoteQuestion';
import Link from 'next/link';

export function Sidebar() {

  const [index] = useSmartNoteIndex()

  const router = useSmartNoteRouter()

  return (
    <List>
      {Object.entries(index).map((entry, index) => {
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