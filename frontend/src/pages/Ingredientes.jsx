import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function Ingredientes() {
  // Exemplo estático, depois será integrado ao backend
  const ingredientes = [
    { ingrediente: 'Queijo', quantidade: '200g' },
    { ingrediente: 'Presunto', quantidade: '150g' },
    { ingrediente: 'Tomate', quantidade: '100g' },
  ];

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>
        Ingredientes
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {ingredientes.map((ing, idx) => (
          <motion.div
            key={ing.ingrediente}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <Paper elevation={6} sx={{
              p: 3,
              minWidth: 220,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #FFF6B7 60%, #F9C74F 100%)',
              color: '#232946',
              boxShadow: '0 8px 32px #F9C74F44',
              mb: 2,
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{ing.ingrediente}</Typography>
              <Typography variant="body1">Quantidade: <b>{ing.quantidade}</b></Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
