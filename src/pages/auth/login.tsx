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

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      router.push('/expenses');
    } catch (err) {
      // error stored in slice -> displayed by <Alert />
      console.error('Login failed', err);
    }
  };

  const handleDummyLogin = async () => {
    const dummyEmail = 'rock@rock.com';
    const dummyPassword = '123456';

    // update UI fields so user can see the dummy creds used
    setEmail(dummyEmail);
    setPassword(dummyPassword);

    try {
      await dispatch(
        loginUser({ email: dummyEmail, password: dummyPassword })
      ).unwrap();
      router.push('/expenses');
    } catch (err) {
      console.error('Dummy login failed', err);
      // slice error will show in the Alert
    }
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

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

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

          <Box
            textAlign='right'
            mt={2}
            display='flex'
            justifyContent='flex-end'
            gap={1}
          >
            <Button
              variant='outlined'
              onClick={handleDummyLogin}
              disabled={loading}
              startIcon={loading && <CircularProgress size={18} />}
            >
              Dummy login
            </Button>

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
