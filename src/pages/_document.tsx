import {Head, Html, Main, NextScript} from "next/document";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export default function Document() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });


  return (
      <Html lang="en" data-theme="light" translate="no">
        <Head/>
        <body>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          <Main/>
        </ThemeProvider>
        <NextScript/>
        </body>
      </Html>
  );
}
