import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MenuForm from './MenuForm';
import axios from 'axios';

export default function MenuAdmin() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchMenu = () => {
    setLoading(true);
    axios.get('/pizzas')
      .then(res => {
        setMenu(res.data);
        setError('');
      })
      .catch(() => setError('Erro ao carregar o menu!'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta pizza?')) return;
    try {
      await axios.delete(`/pizzas/${id}`);
      setSuccess('Pizza removida com sucesso!');
      fetchMenu();
    } catch {
      setError('Erro ao remover pizza!');
    }
  };

  const handleFormSuccess = () => {
    setOpenForm(false);
    setEditItem(null);
    fetchMenu();
  };

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress color="secondary" /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>
        Administração de Pizzas
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mb: 3 }} onClick={() => { setEditItem(null); setOpenForm(true); }}>
        Adicionar Nova Pizza
      </Button>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {menu.map(item => (
          <Paper key={item.id} elevation={6} sx={{ p: 3, minWidth: 260, borderRadius: 6, mb: 2, position: 'relative', background: 'linear-gradient(135deg, #FFF6B7 60%, #F9C74F 100%)', color: '#232946', boxShadow: '0 8px 32px #F9C74F44' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.nome}</Typography>
            <Typography variant="body1">Descrição: <b>{item.descricao}</b></Typography>
            <Typography variant="h6" color="secondary">R$ {item.preco?.toFixed(2)}</Typography>
            <Box mt={2} display="flex" gap={1}>
              <Button variant="outlined" color="info" onClick={() => handleEdit(item)}>
                Editar
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>
                Remover
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editItem ? 'Editar Pizza' : 'Nova Pizza'}</DialogTitle>
        <DialogContent>
          <MenuForm editItem={editItem} onSuccess={handleFormSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!success} autoHideDuration={2000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
    </Box>
  );
}
