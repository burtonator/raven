import { Box, Dialog, DialogContent, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function AutoUIChat() {

  return (
    <Paper
      elevation={3}
      style={{position: 'absolute', right: 10, bottom: 10, width: '400px', height: '500px', display: 'flex', flexDirection: "column"}}
    >

      <Box p={1} justifyContent="flex-end" style={{flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>

        <TextField fullWidth={true} placeholder="Describe the page you would like generated"/>
      </Box>

    </Paper>
  )

}