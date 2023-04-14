import {
  SmartNoteView,
  useSmartNoteRouterNotesStack
} from '@/src/components/SmartNoteView';
import {
  SmartNoteIndexProvider
} from '@/src/components/SmartNoteIndexProvider';
import { SmartNoteQuestion } from '@/src/components/SmartNoteQuestion';
import {
  AppBar,
  Box, Divider,
  Drawer,
  List,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from '@mui/material';

const drawerWidth = 400

export default function Index() {

  const path = useSmartNoteRouterNotesStack()

  return (
    <SmartNoteIndexProvider>
      <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Raven
          </Typography>
        </Toolbar>
      </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    {/*<ListItemIcon>*/}
                    {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                    {/*</ListItemIcon>*/}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    {/*<ListItemIcon>*/}
                    {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                    {/*</ListItemIcon>*/}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

          <Toolbar/>

        <>
        {path.length === 0 && (
          <Box p={1} style={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{ml: 'auto', mr: 'auto'}}>
              <SmartNoteQuestion/>
            </Box>
          </Box>
        )}

        {path.length > 0 && (
          <Box mt={1}>
            <SmartNoteView stack={path}
                           style={{flexGrow: 1, justifyContent: 'center'}}/>
          </Box>
        )}

      </>
        </Box>

      </Box>
    </SmartNoteIndexProvider>
  )

}