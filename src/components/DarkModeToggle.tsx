import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkModeToggle({
  mode,
  setMode,
}: {
  mode: 'light' | 'dark';
  setMode: (m: 'light' | 'dark') => void;
}) {
  return (
    <IconButton
      sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2000 }}
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
