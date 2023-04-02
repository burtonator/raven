import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

// const theme = createTheme({theme: 'dark'})

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <CssBaseline/>
      <Component {...pageProps} />
    </>
  )
}
