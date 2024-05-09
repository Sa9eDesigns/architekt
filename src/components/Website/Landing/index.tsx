import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import HeroLeft01 from './Blocks/HeroLeft01';
import HeroLeft02 from './Blocks/HeroLeft02';
import HeroLeft03 from './Blocks/HeroLeft03';
import HeroLeft04 from './Blocks/HeroLeft04';
import HeroLeft05 from './Blocks/HeroLeft05';
import HeroLeft06 from './Blocks/HeroLeft06';
import HeroLeft07 from './Blocks/HeroLeft07';
import HeroLeft08 from './Blocks/HeroLeft08';
import HeroLeft09 from './Blocks/HeroLeft09';
import HeroLeft10 from './Blocks/HeroLeft10';
import { Icon } from '@iconify/react';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        position: 'fixed',
        zIndex: 999,
        top: '1rem',
        right: '1rem',
        borderRadius: '50%',
        boxShadow: 'sm',
      }}
    >
      {mode === 'light' ? <Icon icon="heroicons:moon-16-solid"/> : <Icon icon="heroicons:sun"/>}
    </IconButton>
  );
}

export default function TeamExample() {
  return (
    <Box
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
          },
        }}
      >
        <HeroLeft01 />
        <HeroLeft02 />
        <HeroLeft03 />
        <HeroLeft04 />
        <HeroLeft05 />
        <HeroLeft06 />
        <HeroLeft07 />
        <HeroLeft08 />
        <HeroLeft09 />
        <HeroLeft10 />
    </Box>
  );
}
