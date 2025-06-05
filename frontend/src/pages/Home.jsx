import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Box textAlign="center" mt={8}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Typography variant="h1" color="secondary" gutterBottom sx={{ fontWeight: 900, letterSpacing: 2 }}>
          Bem-vindo à VTT Pizza
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mb: 4 }}>
          O cardápio mais moderno e saboroso da cidade!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore nosso menu, adicione ao carrinho e aproveite uma experiência visual incrível.
        </Typography>
      </motion.div>
    </Box>
  );
}
