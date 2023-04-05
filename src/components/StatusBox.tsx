import { Box } from '@mui/material';

interface StatusBoxProps {
  readonly text: string
}

export const StatusBox = (props: StatusBoxProps) => {
  return (
    <Box p={1} style={{textAlign: 'center'}}>
      {props.text}
    </Box>
  )
}