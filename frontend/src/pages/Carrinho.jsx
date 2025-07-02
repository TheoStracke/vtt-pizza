import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, IconButton, Snackbar, Alert, CircularProgress, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [quantidades, setQuantidades] = useState({});
  const clienteId = localStorage.getItem('clienteId');

  const fetchCarrinho = async () => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      setError('Faça login/cadastro para usar o carrinho!');
      return;
    }
    try {
      const res = await axios.get(`/carrinho/cliente/${clienteId}`);
      setItens(res.data);
      setQuantidades(Object.fromEntries(res.data.map(item => [item.id, item.quantidade])));
    } catch {
      setError('Erro ao carregar o carrinho!');
    }
  };

  useEffect(() => { fetchCarrinho(); }, []);

  const handleRemover = async (itemId) => {
    try {
      await axios.delete(`/carrinho/${itemId}`);
      setSuccess('Item removido!');
      fetchCarrinho();
    } catch {
      setError('Erro ao remover item!');
    }
  };

  const handleAtualizar = async (item) => {
    try {
      await axios.put('/carrinho', { ...item, quantidade: quantidades[item.id] });
      setSuccess('Quantidade atualizada!');
      fetchCarrinho();
    } catch {
      setError('Erro ao atualizar quantidade!');
    }
  };

  const handleChangeQuantidade = (id, delta) => {
    setQuantidades(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) + delta) }));
  };

  const total = itens.reduce((sum, item) => sum + (item.pizza?.preco || 0) * (quantidades[item.id] || item.quantidade), 0);

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress color="secondary" /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>Carrinho</Typography>
      {itens.length === 0 ? (
        <Alert severity="info">Seu carrinho está vazio.</Alert>
      ) : (
        <Box>
          {itens.map(item => (
            <Paper key={item.id} elevation={4} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box flex={1}>
                <Typography variant="h6">{item.pizza?.nome || item.nomePizza}</Typography>
                <Typography variant="body2">Preço: R$ {(item.pizza?.preco || item.precoUnitario)?.toFixed(2)}</Typography>
                <Typography variant="body2">Subtotal: R$ {((item.pizza?.preco || item.precoUnitario) * (quantidades[item.id] || item.quantidade)).toFixed(2)}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => handleChangeQuantidade(item.id, -1)}><RemoveIcon /></IconButton>
                <TextField type="number" size="small" value={quantidades[item.id] || item.quantidade} inputProps={{ min: 1, style: { width: 40, textAlign: 'center' } }} onChange={e => setQuantidades(q => ({ ...q, [item.id]: Math.max(1, Number(e.target.value)) }))} />
                <IconButton onClick={() => handleChangeQuantidade(item.id, 1)}><AddIcon /></IconButton>
                <Button variant="outlined" color="info" sx={{ ml: 1 }} onClick={() => handleAtualizar(item)}>Atualizar</Button>
                <IconButton color="error" onClick={() => handleRemover(item.id)}><DeleteIcon /></IconButton>
              </Box>
            </Paper>
          ))}
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 700 }}>Total: R$ {total.toFixed(2)}</Typography>
        </Box>
      )}
      <Snackbar open={!!success} autoHideDuration={2000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
    </Box>
  );
}
