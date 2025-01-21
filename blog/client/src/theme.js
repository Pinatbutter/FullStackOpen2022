import { blueGrey, deepOrange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      light: '#4a626d',
      main: '#a6bfcc',
      dark: '#a6bfcc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ff7b47',
      main: '#ab0300',
      dark: '#ab0300',
      contrastText: '#000',
    },
    tertiary: {
      main: blueGrey[700],
      contrastText: '#000',
    },
    divider: deepOrange[400],
    background: {
      paper: '#000000',
    },
    text: {
      primary: blueGrey[600],
      secondary: '#ff7b47',
    },
    mode: 'dark',
  },
});

export default theme;
