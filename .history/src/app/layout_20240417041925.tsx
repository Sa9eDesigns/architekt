import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
//Context
import {AppGlobalsProvider} from '@/contexts/AppGlobalsContext';
import local from 'next/font/local';

//Metadata
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

//Fonts
const f_inno = local({
  src: [
    {
      path: '../public/fonts/inno.otf',
    },
  ],
  variable: '--font-inno',
});

const circular = local({
  src: [
    {
      path: '/public/fonts/CircularStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/public/fonts/CircularStd-Bold.otf',
      weight: '700',
    },
    {
      path: '/public/fonts/CircularStd-Light.otf',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--font-circular',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${circular.variable} ${f_inno.variable}`}>
        <ThemeRegistry>
          <AppGlobalsProvider>
          {props.children}
          </AppGlobalsProvider>
          </ThemeRegistry>
      </body>
    </html>
  );
}
