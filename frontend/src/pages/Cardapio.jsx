import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function Cardapio() {
  // Exemplo estático, depois será integrado ao backend
  const pizzas = [
    { nome: 'Margherita', tamanho: 'Grande', valor: 50.0 },
    { nome: 'Calabresa', tamanho: 'Média', valor: 35.0 },
    { nome: 'Quatro Queijos', tamanho: 'Grande', valor: 55.0 },
  ];

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>
        Cardápio
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {pizzas.map((pizza, idx) => (
          <motion.div
            key={pizza.nome}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <Paper elevation={6} sx={{
              p: 3,
              minWidth: 260,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #FFD600 60%, #D32F2F 100%)',
              color: '#1a1a1a',
              boxShadow: '0 8px 32px #D32F2F44',
              mb: 2,
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{pizza.nome}</Typography>
              <Typography variant="body1">Tamanho: <b>{pizza.tamanho}</b></Typography>
              <Typography variant="h6" color="secondary">R$ {pizza.valor.toFixed(2)}</Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
