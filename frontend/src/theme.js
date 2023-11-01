import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // A shade of blue for the primary color
    },
    secondary: {
      main: '#E91E63', // A shade of pink for the secondary color
    },
    error: {
      main: '#FF5722', // A shade of orange for error messages
    },
    background: {
      default: '#F5F5F5', // A light gray background
    },
  },
});

export default theme;
