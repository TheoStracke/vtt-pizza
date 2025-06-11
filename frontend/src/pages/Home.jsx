import bannerImg from '../assets/banner.js';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Box sx={{ background: '#fff', minHeight: '80vh', py: 6 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900, letterSpacing: 2 }}>
              A Parma
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
              Rodízio, À La Carte e Delivery
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 3, maxWidth: 500 }}>
              Em 1999, no bairro de Capoeiras, Florianópolis, a Parma iniciou como um pequeno delivery e com uma maneira
              diferente de fazer pizzas, tendo como base a massa fina e crocante e ingredientes de primeiríssima qualidade,
              aliada à experiência de mais de 15 anos de seu proprietário como pizzaiolo. Hoje, com seu restaurante no
              centro da Palhoça, confortável, moderno e aconchegante, apresenta um rodízio especial com opções incríveis,
              além de seu delivery eficiente e seguro.
            </Typography>
            <Button variant="contained" color="secondary" size="large" href="#cardapio">
              Faça seu pedido
            </Button>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden', maxWidth: 500, mx: 'auto' }}>
              <img
                src={bannerImg}
                alt="Salão Parma"
                style={{ width: '100%', display: 'block' }}
              />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      <Box mt={6} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          Av. Barão do Rio Branco, 626 - Centro, Palhoça &nbsp;|&nbsp; (48) 3242-0882 &nbsp;|&nbsp; (48) 99158-2608
        </Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            href="https://www.instagram.com/"
            target="_blank"
            sx={{ mx: 1 }}
          >
            Instagram
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="https://wa.me/5548991582608"
            target="_blank"
            sx={{ mx: 1 }}
          >
            WhatsApp
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
