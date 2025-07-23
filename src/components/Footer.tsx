import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component='footer' sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant='body2'>
        Built with ❤️ by Rakezt. Source on <Link href='#'>GitHub</Link>.
      </Typography>
    </Box>
  );
}
