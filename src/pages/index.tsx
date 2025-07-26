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

export default function Home() {
  return (
    <>
      <Navbar />
      <ThreeDHero />

      <Box sx={{ py: 10, bgcolor: '#f5f7fa', textAlign: 'center' }}>
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
              <Button variant='contained' size='large'>
                Get Started for Free
              </Button>
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

        <Stack spacing={4}>
          <FeatureCard
            icon={<TrendingUp color='primary' />}
            title='AI Categorization'
          >
            Automatically tag expenses with intelligent suggestions and learn
            from your habits.
          </FeatureCard>

          <FeatureCard
            icon={<Shield color='secondary' />}
            title='Bank-Level Security'
          >
            All your data is encrypted with military-grade security. You're in
            control.
          </FeatureCard>

          <FeatureCard
            icon={<Star color='warning' />}
            title='Insightful Dashboards'
          >
            Instantly visualize your finances with professional charts and
            reports.
          </FeatureCard>

          <FeatureCard
            icon={<ThumbUpAlt color='success' />}
            title='Seamless Experience'
          >
            Simple, intuitive UI that works beautifully on both mobile and
            desktop.
          </FeatureCard>
        </Stack>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: '#fafafa', py: 10 }}>
        <Container>
          <Typography variant='h4' align='center' gutterBottom fontWeight={600}>
            Trusted by Budget-Conscious People Like You
          </Typography>
          <Stack spacing={4} sx={{ mt: 6 }}>
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
          </Stack>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#f0f4ff' }}>
        <Container>
          <Typography variant='h4' gutterBottom fontWeight={600}>
            Ready to Take Control of Your Spending?
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Start for free — just register and start tracking.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href='/auth/register' passHref>
              <Button variant='contained' size='large' color='primary'>
                Join Now
              </Button>
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
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        transition: 'all 0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Box sx={{ mt: '4px' }}>{icon}</Box>
      <Box>
        <Typography variant='h6' fontWeight={600}>
          {title}
        </Typography>
        <Typography color='text.secondary'>{children}</Typography>
      </Box>
    </Paper>
  );
}

function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
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
