'use client'

import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';

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

export default function LandingPage() {
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
