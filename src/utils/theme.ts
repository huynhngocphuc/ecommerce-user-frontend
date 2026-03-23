// src/theme.ts
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0052CC', // Xanh dương công nghệ
    },
    secondary: {
      main: '#FF6F00', // Cam nhấn mạnh CTA
    },
    background: {
      default: '#F5F5F5',
      paper: '#fff',
    },
    error: {
      main: '#dc3545',
    },
    success: {
      main: '#28a745',
    },
    warning: {
      main: '#ffc107',
    },
    text: {
      primary: '#212121',
      secondary: '#333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 8,
  },
});

export { lightTheme };
