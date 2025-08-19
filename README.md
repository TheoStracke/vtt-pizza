
# VTT Pizza - Sistema Completo de Pizzaria

O VTT Pizza é um sistema acadêmico completo para gerenciamento de uma pizzaria, integrando backend (Spring Boot), frontend (React + Vite) e recursos de Inteligência Artificial (IA). O objetivo é automatizar pedidos, gerenciar clientes, cardápio, ingredientes, carrinho e pedidos, além de oferecer uma experiência moderna e personalizada.

# Equipe
Thiago
Theo
Vinicius


## Funcionalidades
### Cliente
- Visualização do cardápio
- Filtro de ingredientes
- Adição de pizzas ao carrinho
- Cadastro e login
- Finalização de pedidos

### Administrador
- Cadastro/edição de pizzas e ingredientes
- Visualização e gerenciamento de pedidos
- Acesso a relatórios

### Inteligência Artificial (IA)
- Sugestão de pizzas baseada em preferências do usuário
- Geração automática de descrições de pizzas


## Instalação e Execução

### Backend (Spring Boot)
1. Configure o banco de dados em `src/main/resources/application.properties` (MySQL por padrão, mas pode usar H2 para testes).
2. Execute:
  ```sh
  ./mvnw spring-boot:run
  ```
3. Acesse a API em http://localhost:8080/

### Frontend (React + Vite)
1. No terminal:
  ```sh
  cd frontend
  npm install
  npm run dev
  ```
2. Acesse http://localhost:5173/

### Banco de Dados
- Execute o script `dataBase/vtt-pizza.sql` no MySQL para criar as tabelas e dados iniciais.

### Docker
- O projeto possui Dockerfile para backend e frontend, facilitando o deploy em containers.


## Endpoints principais (exemplos)
- GET    `/api/cardapio`         → Lista todos os itens do cardápio
- GET    `/api/cardapio/{id}`    → Detalhes de um item
- POST   `/api/cardapio`         → Adiciona novo item
- PUT    `/api/cardapio/{id}`    → Edita item
- DELETE `/api/cardapio/{id}`    → Remove item

## Prompts do GitHub Copilot utilizados
- "desenvolva o frontend a partir do backend do projeto completo com react, quero animações fluidas e cores em amarelo e tons de amarelo, vermelho e vermelho escuro, design super megar hiper moderno"
- "as cores estão feias, deixa com cores mais modernas, tem que ser clicável com opção de adicionar no carrinho"
- "Continue: 'Continue to iterate?'"
- "Failed to load resource: the server responded with a status of 404 (Not Found) ..."
- "ERR_CONNECTION_REFUSED\nNão é possível acessar esse site\nA conexão com localhost foi recusada. ..."
- "npm ERR! code ENOENT\nnpm ERR! syscall open\nnpm ERR! path ...\nnpm ERR! enoent Could not read package.json: Error: ENOENT: no such file or directory, open ..."
- "[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:3.5.3:test (default-test) on project pizzademo: ..."
- "[ERROR] Failed to execute goal org.springframework.boot:spring-boot-maven-plugin:3.4.5:run (default-cli) on project pizzademo: Process terminated with exit code: 1 ..."


## Testes
- O backend possui testes automatizados (JUnit/Spring Boot) em `src/test/java/com/pizzaria/`.
- O frontend possui testes com React Testing Library em `frontend/src/App.test.jsx`.
- Você pode testar manualmente via interface web ou ferramentas como Postman.


## Estrutura do Projeto
- Frontend: `frontend/`
- Backend: `src/main/java/com/pizzaria/`
- Scripts SQL: `dataBase/`
- Testes: `src/test/java/com/pizzaria/` e `frontend/src/`


## Inteligência Artificial (IA)
O sistema utiliza IA para:
- **Recomendar pizzas**: Sugestões baseadas em preferências do usuário, histórico de pedidos ou ingredientes favoritos.
- **Gerar descrições automáticas**: Utiliza técnicas de Processamento de Linguagem Natural (PLN) para criar descrições atrativas para novos sabores.

A IA pode ser implementada tanto no backend (Java) quanto no frontend (JavaScript), usando bibliotecas como TensorFlow, scikit-learn ou APIs externas. O objetivo é personalizar a experiência do usuário e agilizar o cadastro de novos produtos.

---


---

Se tiver dúvidas, abra uma issue ou consulte os comentários no código!
