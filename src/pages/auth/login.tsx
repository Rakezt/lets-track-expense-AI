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
import { loginUser } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(loginUser({ email, password }));
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
            Login
          </Typography>

          {error && <Alert severity='error'>{error}</Alert>}

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
              Login
            </Button>
          </Box>

          <Box mt={2}>
            <Typography variant='body2'>
              Don't have an account?{' '}
              <Button href='/auth/register' variant='text' size='small'>
                Register
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
