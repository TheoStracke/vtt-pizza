import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cardapio() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '' });
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMenu = () => {
    setLoading(true);
    axios.get('/pizzas')
      .then(res => {
        setMenu(res.data);
        setError('');
      })
      .catch(() => setError('Erro ao carregar o cardápio!'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
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

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      if (editItem) {
        await axios.put(`/pizzas/${editItem.id}`, form);
        setSuccess('Item atualizado com sucesso!');
      } else {
        await axios.post('/pizzas', form);
        setSuccess('Item adicionado com sucesso!');
        setForm({ nome: '', descricao: '', preco: '' });
      }
      setOpenForm(false);
      setEditItem(null);
      fetchMenu();
    } catch {
      setError('Erro ao salvar item!');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddToCart = async (pizza) => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      setError('Faça login/cadastro para adicionar ao carrinho!');
      return;
    }
    try {
      await axios.post('/carrinho', {
        pizza: { id: pizza.id, nome: pizza.nome, preco: pizza.preco },
        quantidade: 1,
        cliente: { id: clienteId }
      });
      setSuccess('Adicionado ao carrinho!');
    } catch {
      setError('Erro ao adicionar ao carrinho!');
    }
  };

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress color="secondary" /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 900 }}>
        Cardápio
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mb: 3 }} onClick={() => { setEditItem(null); setForm({ nome: '', descricao: '', preco: '' }); setOpenForm(true); }}>
        Adicionar Nova Pizza
      </Button>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {menu.map(item => (
          <Paper key={item.id} elevation={6} sx={{ p: 3, minWidth: 260, borderRadius: 6, mb: 2, position: 'relative' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.nome}</Typography>
            <Typography variant="body1">Descrição: <b>{item.descricao}</b></Typography>
            <Typography variant="h6" color="secondary">R$ {item.preco?.toFixed(2)}</Typography>
            <Box mt={2} display="flex" gap={1}>
              <Button variant="contained" color="secondary" startIcon={<ShoppingCartIcon />} onClick={() => handleAddToCart(item)}>
                Adicionar ao Carrinho
              </Button>
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
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={form.descricao}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Preço"
              name="preco"
              value={form.preco}
              onChange={handleFormChange}
              type="number"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="secondary" disabled={formLoading} fullWidth>
              {formLoading ? <CircularProgress size={24} color="inherit" /> : (editItem ? 'Salvar Alterações' : 'Adicionar')}
            </Button>
          </form>
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
