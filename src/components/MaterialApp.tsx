import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface MaterialAppProps {
  readonly children: JSX.Element
}

export default function MaterialApp(props: MaterialAppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      {props.children}
    </ThemeProvider>
  )
}
