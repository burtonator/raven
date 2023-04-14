import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
  useSmartNoteContext,
  useSmartNoteIndex
} from '@/src/components/SmartNoteIndexProvider';

export function Sidebar() {

  const [index] = useSmartNoteIndex()

  return (
    <List>
      {Object.entries(index).map((entry, index) => {
        const [key, value] = entry
        return (
          <ListItem key={key} disablePadding>
            <ListItemButton>
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