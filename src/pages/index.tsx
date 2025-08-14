import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ThreeDHero from '../components/ThreeDHero';
import Footer from '../components/Footer';
import { Star, Shield, TrendingUp, ThumbUpAlt } from '@mui/icons-material';
import { useAppSelector } from '../store';

export default function Home() {
  const token = useAppSelector((s) => s.auth.token);
  return (
    <>
      <Navbar />
      <ThreeDHero />

      <Box
        sx={(theme) => ({
          py: 10,
          textAlign: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        })}
      >
        <Container>
          <Typography variant='h2' gutterBottom fontWeight={700}>
            Smarter Expense Tracking with AI
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Manage your money effortlessly. Get smart insights, real-time
            reports, and personalized budgeting tools.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href='/auth/register' passHref>
              {!token ? (
                <>
                  <Button variant='contained' size='large'>
                    Get Started for Free
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant='h4' align='center' gutterBottom fontWeight={600}>
          Powerful Features to Simplify Your Finances
        </Typography>
        <Typography align='center' color='text.secondary' sx={{ mb: 6 }}>
          Everything you need to manage your expenses smarter.
        </Typography>

        <Stack
          direction='row'
          spacing={6}
          useFlexGap
          flexWrap='wrap'
          justifyContent='center'
        >
          <FeatureCard
            icon={<TrendingUp fontSize='large' color='primary' />}
            title='AI Categorization'
          >
            Automatically tag expenses using smart AI that adapts to your
            habits.
          </FeatureCard>

          <FeatureCard
            icon={<Shield fontSize='large' color='primary' />}
            title='Bank-Level Security'
          >
            Your data is protected with industry-leading encryption.
          </FeatureCard>

          <FeatureCard
            icon={<Star fontSize='large' color='primary' />}
            title='Insightful Dashboards'
          >
            Visualize your spending patterns with rich analytics.
          </FeatureCard>

          <FeatureCard
            icon={<ThumbUpAlt fontSize='large' color='primary' />}
            title='Seamless Experience'
          >
            Intuitive design for smooth tracking on any device.
          </FeatureCard>
        </Stack>
      </Container>

      {/* Testimonials */}
      <Box
        sx={(theme) => ({
          py: 10,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
        })}
      >
        <Container>
          <Typography variant='h4' align='center' gutterBottom fontWeight={600}>
            Trusted by Budget-Conscious People Like You
          </Typography>

          <Stack
            direction='row'
            spacing={4}
            useFlexGap
            flexWrap='wrap'
            justifyContent='center'
            sx={{ mt: 6 }}
          >
            <TestimonialCard
              name='Ayesha S.'
              quote='I’ve saved so much since I started using this! The charts and weekly breakdowns are game changers.'
            />
            <TestimonialCard
              name='Rahul M.'
              quote="Clean UI, instant sync, and I love the categorization. The best tracker I've tried so far."
            />
            <TestimonialCard
              name='Liam P.'
              quote='Finally something that actually helps me understand where my money goes each month.'
            />
            <TestimonialCard
              name='Sofia R.'
              quote='User-friendly, reliable, and incredibly insightful. Highly recommended for anyone managing a budget.'
            />
          </Stack>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={(theme) => ({
          py: 10,
          textAlign: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'blue.50',
        })}
      >
        <Container>
          <Typography variant='h4' gutterBottom fontWeight={600}>
            Ready to Take Control of Your Spending?
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Start for free — just register and start tracking.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href='/auth/register' passHref>
              {!token ? (
                <>
                  <Button variant='contained' size='large' color='primary'>
                    Join Now
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Link>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        p: 4,
        borderRadius: 4,
        textAlign: 'center',
        flex: '1 1 300px',
        minWidth: 380,
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.background.paper,
        transition: 'all 0.3s',
        '&:hover': { boxShadow: 6 },
      })}
    >
      <Box sx={{ mb: 2 }}>{icon}</Box>
      <Typography variant='h6' fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography color='text.secondary' align='center'>
        {children}
      </Typography>
    </Paper>
  );
}

function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        flex: '1 1 300px',
        minWidth: 380,
        maxWidth: 480,
      }}
    >
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
        “{quote}”
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant='subtitle1' fontWeight={600}>
        — {name}
      </Typography>
    </Paper>
  );
}
