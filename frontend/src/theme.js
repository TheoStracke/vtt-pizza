// Tema de cores e estilos globais para o app
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#22223B', // azul escuro moderno
      light: '#4A4E69', // roxo acinzentado
      dark: '#1A1A2E', // quase preto
      contrastText: '#F2E9E4', // bege claro
    },
    secondary: {
      main: '#F72585', // rosa vibrante
      dark: '#B5179E', // roxo escuro
      light: '#FBB1D2', // rosa claro
      contrastText: '#fff',
    },
    background: {
      default: '#232946', // azul escuro
      paper: '#393E6A', // roxo acinzentado
    },
    text: {
      primary: '#F2E9E4', // bege claro
      secondary: '#F72585', // rosa vibrante
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
      contrastText: '#22223B',
    },
    info: {
      main: '#4361EE', // azul vibrante
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
          boxShadow: '0 2px 12px #F7258533',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #232946 60%, #F72585 100%)',
          color: '#F2E9E4',
        },
      },
    },
  },
});

axios.defaults.baseURL = 'http://localhost:8080'; // ajuste se necessário
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export default theme;
