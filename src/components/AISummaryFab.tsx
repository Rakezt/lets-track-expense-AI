import { Fab, Box, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';

export default function AiSummaryFab({ onClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  const handleDesktopHover = (state: boolean) => {
    if (!isMobile) setExpanded(state);
  };

  const handleClick = () => {
    if (isMobile) {
      if (!expanded) {
        setExpanded(true);
      } else {
        onClick();
        setExpanded(false);
      }
    } else {
      onClick();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 24,
        zIndex: 2000,
      }}
    >
      <Tooltip title>
        <Fab
          variant={expanded ? 'extended' : 'circular'}
          onClick={handleClick}
          onMouseEnter={() => handleDesktopHover(true)}
          onMouseLeave={() => handleDesktopHover(false)}
          sx={{
            background: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)',
            color: 'white',
            boxShadow: '0 8px 20px rgba(99,102,241,0.25)',
            px: expanded ? 2.5 : 0,
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 12px 30px rgba(99,102,241,0.32)',
            },
          }}
        >
          <AutoAwesomeIcon sx={{ mr: expanded ? 1 : 0 }} />
          {expanded && 'Use AI to summarise expenses'}
        </Fab>
      </Tooltip>
    </Box>
  );
}
