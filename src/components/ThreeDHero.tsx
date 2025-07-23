import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import analyticsAnimation from '../../public/Little power robot.json'; // Place downloaded JSON file in /public or /assets

export default function ThreeDHero() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        bgcolor: 'background.paper',
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
