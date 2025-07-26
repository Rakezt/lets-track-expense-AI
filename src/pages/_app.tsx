import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { loadUserFromStorage } from '../store/slices/authSlice';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { createAppTheme } from '../theme/theme';
import { store } from '../store';

import { ThemeModeProvider, useThemeMode } from '../context/ThemeContext';

function InnerApp({ Component, pageProps }: AppProps) {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default function App(appProps: AppProps) {
  return (
    <ThemeModeProvider>
      <InnerApp {...appProps} />
    </ThemeModeProvider>
  );
}
