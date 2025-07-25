# Enquete

Aplicação web para criação, votação e acompanhamento de enquetes em tempo real.

## Tecnologias Utilizadas

- **Next.js** 15 (App Router)
- **React** 19
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (banco de dados)
- **TailwindCSS** (estilização)
- **Radix UI** (componentes acessíveis)
- **Clerk** (autenticação)
- **UploadThing** (upload de imagens)
- **Docker** (ambiente de desenvolvimento)

## Estrutura de Diretórios

```
├── src/
│   ├── app/           # Páginas e rotas
│   │   ├── polls/     # CRUD de enquetes
│   │   ├── actions/   # Funções server actions
│   │   └── api/       # APIs (ex: upload de imagens)
│   ├── components/    # Componentes reutilizáveis
│   ├── lib/           # Utilitários e instâncias (ex: prisma)
│   └── middleware.ts  # Proteção de rotas
├── prisma/            # Migrations e schema do banco
├── public/            # Assets estáticos
├── docker-compose.yml # Ambiente Docker
└── ...
```

## Funcionalidades

- Cadastro e autenticação de usuários (Clerk)
- Criação de enquetes com até 4 opções (com ou sem imagem)
- Listagem de enquetes
- Votação em enquetes (1 voto por usuário)
- Visualização de resultados em tempo real (com barra de progresso)
- Compartilhamento de enquetes (link e QRCode)
- Exclusão de enquetes

## Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- Docker (opcional, para banco de dados)
- PostgreSQL (caso não use Docker)

### 1. Clonar o repositório
```bash
git clone <url-do-repo>
cd enquete
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz com:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enquete
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Subir o banco de dados (usando Docker)
```bash
docker-compose up -d
```

### 4. Instalar dependências e rodar as migrations
```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

### 5. Rodar o projeto
```bash
npm run dev
```
Acesse: http://localhost:3000

#### Ou rode tudo com Docker (Node + Postgres):
```bash
docker-compose up --build
```

## Principais Scripts
- `npm run dev` — inicia o servidor Next.js em modo desenvolvimento
- `npm run build` — build de produção
- `npm run start` — inicia o servidor em produção
- `npx prisma migrate deploy` — aplica as migrations

## Estrutura do Banco de Dados (Prisma)
- **Poll**: id, title, description, createdAt, updatedAt
- **Option**: id, title, imageUrl, pollId, createdAt, updatedAt
- **Vote**: id, pollId, optionId, createdAt

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push na branch: `git push origin minha-feature`
5. Abra um Pull Request

---

Projeto desenvolvido com Next.js, Prisma, Clerk e TailwindCSS.
