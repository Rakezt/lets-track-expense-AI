import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import analyticsAnimation from '../../public/Little power robot.json';
export default function ThreeDHero() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        bgcolor: '#ffffff',
        textAlign: 'center',
      }}
    >
      <Lottie
        animationData={analyticsAnimation}
        loop={true}
        style={{ height: 400 }}
      />
    </Box>
  );
}
