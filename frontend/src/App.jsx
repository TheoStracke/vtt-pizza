import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Ingredientes from './pages/Ingredientes';
import MenuAdmin from './pages/MenuAdmin';
import ClienteForm from './pages/ClienteForm';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary" elevation={4} sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 2 }}>
              VTT Pizza
            </Typography>
            <Button color="secondary" component={Link} to="/">Home</Button>
            <Button color="secondary" component={Link} to="/cardapio">Cardápio</Button>
            <Button color="secondary" component={Link} to="/ingredientes">Ingredientes</Button>
            <Button color="secondary" component={Link} to="/cardapio/admin">Admin</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 1, md: 4 }, minHeight: '70vh' }}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/cardapio" element={<PageWrapper><Cardapio /></PageWrapper>} />
              <Route path="/cardapio/admin" element={<PageWrapper><MenuAdmin /></PageWrapper>} />
              <Route path="/ingredientes" element={<PageWrapper><Ingredientes /></PageWrapper>} />
              <Route path="/cliente" element={<PageWrapper><ClienteForm /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default App
