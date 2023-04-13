import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AsyncLatchProvider } from '@/src/components/AsyncLatchProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <AsyncLatchProvider>
        <Component {...pageProps} />
      </AsyncLatchProvider>
    </ThemeProvider>
  )
}
