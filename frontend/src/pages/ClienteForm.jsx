import { useState } from "react";

export default function ClienteForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, cpf, endereco }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("clienteId", data.id);
      setMensagem("Cliente cadastrado com sucesso! ID: " + data.id);
      setNome(""); setEmail(""); setTelefone(""); setCpf(""); setEndereco("");
    } else {
      setMensagem("Erro ao cadastrar cliente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Cliente</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
      <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} required />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}
