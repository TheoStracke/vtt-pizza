import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";

export default function ClienteForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(false);
    setMensagem("");
    const response = await fetch("http://localhost:8080/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("clienteId", data.id);
      setMensagem("Cliente cadastrado com sucesso! ID: " + data.id);
      setNome(""); setEmail(""); setTelefone("");
    } else {
      setErro(true);
      setMensagem("Erro ao cadastrar cliente.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={4} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center" fontWeight={700} color="primary">
          Cadastro de Cliente
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} required fullWidth />
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth type="email" />
          <TextField label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required fullWidth />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Cadastrar</Button>
        </form>
        {mensagem && (
          <Alert severity={erro ? "error" : "success"} sx={{ mt: 2 }}>{mensagem}</Alert>
        )}
      </Paper>
    </Box>
  );
}
