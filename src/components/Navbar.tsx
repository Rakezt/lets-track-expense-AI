import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/index';
import { logout } from '../store/slices/authSlice';
import { useThemeMode } from '../context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleMode } = useThemeMode();

  const open = Boolean(anchorEl);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    router.push('/');
  };

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          AIExpenses
        </Typography>

        {!token ? (
          <Link href='/auth/login' passHref>
            <Button sx={{ color: 'white' }}>Login</Button>
          </Link>
        ) : (
          <>
            <IconButton color='inherit' onClick={handleMenuOpen}>
              <SettingsIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <Box px={2} py={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mode === 'dark'}
                      onChange={() => {
                        toggleMode();
                      }}
                    />
                  }
                  label={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                />
              </Box>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
