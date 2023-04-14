import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AsyncLatchProvider } from '@/src/components/AsyncLatchProvider';
import {
  SmartNoteIndexProvider
} from '@/src/components/SmartNoteIndexProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface SafeHydrateProps {
  readonly children: JSX.Element
}

function SafeHydrate(props: SafeHydrateProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : props.children}
    </div>
  )
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <AsyncLatchProvider>
        <SafeHydrate>
          <SmartNoteIndexProvider>
            <Component {...pageProps} />
          </SmartNoteIndexProvider>
        </SafeHydrate>
      </AsyncLatchProvider>
    </ThemeProvider>
  )
}
