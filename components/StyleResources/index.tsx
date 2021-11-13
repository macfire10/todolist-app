import React from 'react'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'

export const StyleResources: React.FC<{}> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          subtitle2: {
            textTransform: 'capitalize'
          },
        }
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      {children}
    </ThemeProvider>
  )
}
