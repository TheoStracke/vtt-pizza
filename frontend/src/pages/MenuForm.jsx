import { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function MenuForm({ editItem, onSuccess }) {
  const [form, setForm] = useState(editItem || { nome: '', tamanho: '', valor: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editItem) {
        await axios.put(`/menu/${editItem.id}`, form);
        setSuccess('Item atualizado com sucesso!');
      } else {
        await axios.post('/menu', form);
        setSuccess('Item adicionado com sucesso!');
        setForm({ nome: '', tamanho: '', valor: '' });
      }
      if (onSuccess) onSuccess();
    } catch {
      setError('Erro ao salvar item!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 6, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" color="primary" sx={{ fontWeight: 900, mb: 2 }}>
        {editItem ? 'Editar Item' : 'Novo Item'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tamanho"
          name="tamanho"
          value={form.tamanho}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Valor"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          type="number"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="secondary" disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} color="inherit" /> : (editItem ? 'Salvar Alterações' : 'Adicionar')}
        </Button>
      </form>
      <Snackbar open={!!success} autoHideDuration={2000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={2000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>
    </Paper>
  );
}
