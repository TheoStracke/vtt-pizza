import { useState } from 'react';
import { Box, Typography, Button, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function FinalizacaoPedido() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const clienteId = localStorage.getItem('clienteId');

  const finalizarPedido = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`/pedidos/finalizar?clienteId=${clienteId}`);
      setPedido(res.data);
      setSuccess('Pedido realizado com sucesso!');
    } catch {
      setError('Erro ao finalizar pedido!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>Finalizar Pedido</Typography>
      <Button variant="contained" color="secondary" onClick={finalizarPedido} disabled={loading || pedido} sx={{ mb: 3 }}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Finalizar Pedido'}
      </Button>
      {pedido && (
        <Paper elevation={4} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5">Resumo do Pedido</Typography>
          <Typography>ID: {pedido.id}</Typography>
          <Typography>Data: {pedido.data?.replace('T', ' ').slice(0, 16)}</Typography>
          <Typography>Status: {pedido.status}</Typography>
          <Typography>Total: R$ {pedido.total?.toFixed(2)}</Typography>
          <Typography sx={{ mt: 2, fontWeight: 700 }}>Itens:</Typography>
          <ul>
            {pedido.itens?.map(item => (
              <li key={item.id}>{item.nomePizza} x{item.quantidade} (R$ {item.precoUnitario?.toFixed(2)} cada)</li>
            ))}
          </ul>
        </Paper>
      )}
      <Snackbar open={!!success} autoHideDuration={2000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={2000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>
    </Box>
  );
}
