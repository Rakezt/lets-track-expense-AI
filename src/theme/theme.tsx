import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? { primary: { main: '#1976d2' } }
      : { primary: { main: '#90caf9' } }),
  },
});

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme(getDesignTokens(mode));
