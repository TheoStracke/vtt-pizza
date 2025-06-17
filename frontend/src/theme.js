// Tema de cores e estilos globais para o app
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232946', // azul escuro
      light: '#4A4E69', // cinza azulado
      dark: '#1A1A2E', // quase preto
      contrastText: '#F2E9E4', // bege claro
    },
    secondary: {
      main: '#F9C74F', // amarelo vibrante
      dark: '#F9844A', // laranja queimado
      light: '#FFF6B7', // amarelo claro
      contrastText: '#232946',
    },
    background: {
      default: '#F7F7F7', // cinza claro
      paper: '#FFFFFF', // branco
    },
    text: {
      primary: '#232946', // azul escuro
      secondary: '#F9C74F', // amarelo vibrante
    },
    success: {
      main: '#43AA8B', // verde moderno
      contrastText: '#fff',
    },
    error: {
      main: '#F94144', // vermelho moderno
      contrastText: '#fff',
    },
    warning: {
      main: '#F9C74F', // amarelo moderno
      contrastText: '#232946',
    },
    info: {
      main: '#577590', // azul acinzentado
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
    h1: { fontWeight: 900, letterSpacing: 2 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 2px 12px #F9C74F33',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          color: '#232946',
        },
      },
    },
  },
});

axios.defaults.baseURL = 'http://localhost:8080'; 
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export default theme;
