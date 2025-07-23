import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const close = () => setAnchorEl(null);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          <Link href='/'>AIExpenses</Link>
        </Typography>

        {!session && (
          <Button color='inherit' href='/auth/login'>
            Login
          </Button>
        )}

        {session && (
          <>
            <Button color='inherit' href='/expenses'>
              Expenses
            </Button>
            <IconButton color='inherit' onClick={handleMenu}>
              <SettingsIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={close}>
              <MenuItem
                onClick={() => {
                  signOut();
                  close();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
