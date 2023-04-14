import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AsyncLatchProvider } from '@/src/components/AsyncLatchProvider';
import {
  SmartNoteIndexProvider
} from '@/src/components/SmartNoteIndexProvider';
import { forwardRef } from 'react';
import NextLink, { LinkProps } from "next/link";
import {Link} from '@mui/material'

const LinkBehaviour = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehaviour(props, ref) {
    return <NextLink passHref={props.passHref ?? false} href={props.href} />;
  }
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {

      defaultProps: {
        // component: Link

      }
    },
    // MuiButtonBase: {
    //   defaultProps: {
    //     LinkComponent: LinkBehaviour
    //   }
    // }
  }
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
        <>
          <SmartNoteIndexProvider>
            <Component {...pageProps} />
          </SmartNoteIndexProvider>
        </>
      </AsyncLatchProvider>
    </ThemeProvider>
  )
}
