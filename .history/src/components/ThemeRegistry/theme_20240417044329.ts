import { extendTheme } from '@mui/joy/styles';
import { Inter, Source_Code_Pro } from 'next/font/google';
import local from 'next/font/local';

//Fonts
const f_inno = local({
  src: [
    {
      path: '../../../public/fonts/inno.otf',
    },
  ],
  variable: '--font-inno',
});

const circular = local({
  src: [
    {
      path: '../../../public/fonts/CircularStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/CircularStd-Bold.otf',
      weight: '700',
    },
    {
      path: '../../../public/fonts/CircularStd-Light.otf',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--font-circular',
})

const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ['var(--joy-fontFamily-fallback)'], // use Joy UI's fallback font
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
});

const theme = extendTheme({
  //Color schemes
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f3f3ff',
          100: '#e9e9fe',
          200: '#d6d6fe',
          300: '#b5b5fd',
          400: '#8b8bfa',
          500: '#5c5cf6',
          600: '#3a3aed',
          700: '#2828d9',
          800: '#2121b6',
          900: '#1d1d95',
        },
        neutral: {
          50: '#fafafb',
          100: '#f4f6f6',
          200: '#e7ebec',
          300: '#d5dadb',
          400: '#a3afb0',
          500: '#728080',
          600: '#556364',
          700: '#415151',
          800: '#293737',
          900: '#182727',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  fontFamily: {
    body: circular.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#4338ca',
          }),
        }),
      },
    },
  },
});

export default theme;
