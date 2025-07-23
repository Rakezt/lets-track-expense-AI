import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import { createAppTheme } from '../theme/theme';
import { store } from '../store';
import DarkModeToggle from '../components/DarkModeToggle';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DarkModeToggle mode={mode} setMode={setMode} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
