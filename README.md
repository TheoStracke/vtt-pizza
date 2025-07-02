# VTT Pizza 🍕

Sistema completo de pizzaria: backend Spring Boot + frontend React moderno, com fluxo de carrinho, pedidos e cadastro de clientes.

## Visão Geral
- **Backend:** Java + Spring Boot, API RESTful, autenticação simples por clienteId.
- **Frontend:** React + Vite + Material-UI, animações modernas, responsivo, experiência fluida.
- **Funcionalidades:**
  - Cadastro de cliente (obrigatório para usar carrinho)
  - Listagem e busca de pizzas (cardápio)
  - Adição/remoção/atualização de itens no carrinho
  - Finalização de pedido (transforma carrinho em pedido)
  - Feedback visual em todas as operações
  - Rotas protegidas para fluxo correto

## Instalação e Execução

### Backend (Spring Boot)
1. Configure o banco (H2 ou MySQL). Exemplo H2:
   ```properties
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.datasource.username=sa
   spring.datasource.password=
   spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
   spring.h2.console.enabled=true
   spring.jpa.hibernate.ddl-auto=update
   ```
2. Rodar:
   ```sh
   Entre no arquivo PizzaDemoApplicaton.java e clique no botão de rodar código.
   ```
3. API disponível em http://localhost:8080/

### Frontend (React + Vite)
1. Em outro terminal:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
2. Acesse http://localhost:5173/

## Principais Endpoints REST

### Cardápio
- `GET    /pizzas`           — Lista pizzas
- `GET    /pizzas/{id}`      — Detalhes de pizza
- `POST   /pizzas`           — Adiciona pizza
- `PUT    /pizzas/{id}`      — Edita pizza
- `DELETE /pizzas/{id}`      — Remove pizza

### Cliente
- `POST   /clientes`         — Cadastra cliente

### Carrinho
- `POST   /carrinho`         — Adiciona item (clienteId, pizzaId, quantidade)
- `GET    /carrinho/cliente/{clienteId}` — Lista itens do carrinho
- `PUT    /carrinho`         — Atualiza quantidade (itemCarrinhoId, quantidade)
- `DELETE /carrinho/{itemId}`— Remove item

### Pedido
- `POST   /pedidos/finalizar?clienteId=...` — Finaliza pedido (transforma carrinho em pedido)
- `GET    /pedidos/usuarios/{clienteId}/pedidos` — Histórico do cliente

## Fluxo do Usuário
1. **Cadastro:**
   - Preencha nome/email/telefone. O clienteId é salvo no localStorage.
2. **Navegue pelo cardápio:**
   - Veja pizzas, filtre, busque, adicione ao carrinho.
3. **Carrinho:**
   - Veja, remova ou altere quantidades. Só aparece se estiver logado.
4. **Finalizar pedido:**
   - Clique em finalizar. O carrinho é esvaziado e o pedido salvo.
5. **Feedback:**
   - Todas as ações mostram loading, sucesso ou erro.

## Estrutura do Projeto
- `frontend/` — React, páginas e componentes
- `src/main/java/com/pizzaria/` — Backend Java
  - `controller/` — Endpoints REST
  - `model/` — Entidades JPA
  - `service/` — Lógica de negócio
  - `repository/` — JPA Repositories
  - `dto/` — DTOs para requests/responses

## Telas e Experiência
- **Cardápio:** visual moderno, busca, filtros, animações
- **Carrinho:** visualização clara, edição inline, feedback
- **Cadastro:** simples, direto, obrigatório para usar carrinho
- **Admin:** CRUD de pizzas

## Autores
- Thiago
- Theo
- Vinicius

---
Projeto desenvolvido em equipe, com apoio do GitHub Copilot.
