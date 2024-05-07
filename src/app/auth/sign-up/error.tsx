/*Error component*/
import { Box, CircularProgress, Typography } from '@mui/joy';
import React from 'react';



export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <svg
        fill="#77767b"
        width={256}
        height={256}
        viewBox="0 0 30 30"
        stroke="#77767b"
        strokeWidth={0}
      >
        <path
          d="M11.514 13c-.45 0-.688.54-.363.857l3.143 3.14-3.146 3.146c-.455.436.255 1.177.707.707L15 17.705l3.146 3.145c.452.47 1.162-.27.707-.707l-3.146-3.145 3.142-3.14c.324-.318.087-.858-.364-.858a.506.506 0 00-.344.15L15 16.29l-3.142-3.14a.504.504 0 00-.344-.15zM2.5 8h25a.499.499 0 110 1h-25a.499.499 0 110-1zM7 6.5a.5.5 0 01-.5.5.5.5 0 01-.5-.5.5.5 0 01.5-.5.5.5 0 01.5.5zm-2 0a.5.5 0 01-.5.5.5.5 0 01-.5-.5.5.5 0 01.5-.5.5.5 0 01.5.5zm-2 0a.5.5 0 01-.5.5.5.5 0 01-.5-.5.5.5 0 01.5-.5.5.5 0 01.5.5zM1.5 4C.678 4 0 4.678 0 5.5v19c0 .822.678 1.5 1.5 1.5h27c.822 0 1.5-.678 1.5-1.5v-19c0-.822-.678-1.5-1.5-1.5h-27zm0 1h27c.286 0 .5.214.5.5v19c0 .286-.214.5-.5.5h-27a.488.488 0 01-.5-.5v-19c0-.286.214-.5.5-.5z"
          stroke="none"
        />
      </svg>

      <Typography level="h4" component="h1">
        <strong>Oops! Something went wrong.</strong>
      </Typography>
    </Box>
  );
}