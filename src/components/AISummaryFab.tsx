import { Fab, Box, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function AiSummaryFab({ onClick }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 24,
        zIndex: 2000,
      }}
    >
      <Tooltip title='Use AI to summarise expenses' arrow>
        <Fab
          variant='extended'
          onClick={onClick}
          sx={{
            background: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)',
            color: 'white',
            boxShadow: '0 8px 20px rgba(99,102,241,0.25)',
            px: 2.5,
            py: 1,
            '&:hover': {
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 12px 30px rgba(99,102,241,0.32)',
            },
            // pulse ring
            '&::after': {
              content: '""',
              position: 'absolute',
              left: -12,
              top: -12,
              right: -12,
              bottom: -12,
              borderRadius: '999px',
              zIndex: -1,
              background:
                'radial-gradient(rgba(99,102,241,0.12), rgba(14,165,233,0.00))',
              opacity: 1,
              transition: 'opacity 0.3s, transform 0.3s',
            },
          }}
        >
          <AutoAwesomeIcon sx={{ mr: 1 }} />
          Use AI to summarise expenses
        </Fab>
      </Tooltip>
    </Box>
  );
}
