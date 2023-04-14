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
import { Sidebar } from '@/src/components/Sidebar';
import Link from 'next/link';

const drawerWidth = 400

export default function Index() {

  const path = useSmartNoteRouterNotesStack()

  return (
    <SmartNoteIndexProvider>
      <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Link href='/smart'>
            <Typography variant="h6" noWrap component="div">
              Raven
            </Typography>

          </Link>
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
            <Sidebar/>
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