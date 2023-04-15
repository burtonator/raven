import {
  SmartNoteView,
  useSmartNoteRouterNotesStack
} from './SmartNoteView';
import { SmartNoteQuestion } from './SmartNoteQuestion';
import {
  AppBar,
  Box, Button,
  Drawer,
  Toolbar,
  Typography
} from '@mui/material';
import { Sidebar } from './Sidebar';

const drawerWidth = 400

export default function SmartHome() {

  const path = useSmartNoteRouterNotesStack()

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {/*<Link href='/smart' component={() => <Typography>hello</Typography>}>*/}

            {/*</Link>*/}

            <Button variant='link' href='/smart'>
              Raven
            </Button>

            {/*<Typography variant="h6" noWrap component="div">*/}
            {/*  Raven*/}
            {/*</Typography>*/}

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
    </>
  )

}