import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { registerUser } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    await dispatch(registerUser({ username, email, password })).unwrap();
    router.push('/auth/login');
  };

  useEffect(() => {
    if (user) router.push('/expenses');
  }, [user]);

  return (
    <>
      <Navbar />
      <Container maxWidth='sm'>
        <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant='h4' gutterBottom>
            Register
          </Typography>

          {error && <Alert severity='error'>{error}</Alert>}

          <TextField
            fullWidth
            label='Name'
            margin='normal'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label='Email'
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box textAlign='right' mt={2}>
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Register
            </Button>
          </Box>

          <Box mt={2}>
            <Typography variant='body2'>
              Already have an account?{' '}
              <Button href='/auth/login' variant='text' size='small'>
                Login
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
