import { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

export default function MenuForm({ editItem, onSuccess }) {
  const [form, setForm] = useState(editItem || { nome: '', descricao: '', preco: '' });
  const [loading, setLoading] = useState(false);
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
        await axios.put(`/pizzas/${editItem.id}`, form);
      } else {
        await axios.post('/pizzas', form);
      }
      onSuccess && onSuccess();
    } catch {
      setError('Erro ao salvar item!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
      <TextField label="Nome" name="nome" value={form.nome} onChange={handleChange} required fullWidth />
      <TextField label="Descrição" name="descricao" value={form.descricao} onChange={handleChange} required fullWidth />
      <TextField label="Preço" name="preco" value={form.preco} onChange={handleChange} type="number" required fullWidth />
      <Button type="submit" variant="contained" color="secondary" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} color="inherit" /> : (editItem ? 'Salvar Alterações' : 'Adicionar')}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
