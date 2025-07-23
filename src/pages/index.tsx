import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ThreeDHero from '../components/ThreeDHero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <ThreeDHero />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant='h3' gutterBottom>
          Track & Analyze Your Expenses
        </Typography>
        <Typography variant='h6' gutterBottom>
          AI‑powered categorization, real‑time updates, and beautiful insights.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Link href='/auth/register' passHref>
            <Button variant='contained' size='large'>
              Get Started
            </Button>
          </Link>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
