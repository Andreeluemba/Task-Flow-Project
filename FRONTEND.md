# Frontend - Sistema de Tarefas Colaborativo

Este documento descreve a estrutura e organização do frontend do projeto.

## 🏗️ Arquitetura

### Tecnologias Utilizadas
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação de dados
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── forms/          # Formulários específicos
│   ├── ui/             # Componentes de interface
│   ├── layout/         # Componentes de layout
│   └── providers/      # Context providers
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── store/              # Gerenciamento de estado (Zustand)
├── services/           # Serviços de API
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários e helpers
└── styles/             # Estilos globais
```

## 🚀 Features Implementadas

### ✅ Autenticação (Task 8)
- **LoginPage** - Página de login com validação
- **RegisterPage** - Página de registro com validação
- **Redirecionamento automático** após autenticação
- **Tratamento de erros** específicos de autenticação
- **Notificações toast** para feedback do usuário

### 🔄 Em Desenvolvimento
- Dashboard principal
- Gerenciamento de tarefas
- Formulários de tarefas

## 📋 Próximas Tarefas

Baseado no arquivo `tasks.md`, as próximas implementações são:

1. **Task 9**: Implementar dashboard principal
2. **Task 10**: Criar componentes de lista de tarefas
3. **Task 11**: Desenvolver formulários de tarefas
4. **Task 12**: Implementar funcionalidades de CRUD

## 🌿 Estratégia de Branches

```
Frontend (branch base)
├── feature/dashboard
├── feature/task-list
├── feature/task-forms
└── feature/task-crud
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Linting
npm run lint

# Preview da build
npm run preview
```

## 📝 Convenções

### Commits
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `refactor:` - Refatoração de código
- `style:` - Mudanças de estilo/formatação
- `docs:` - Documentação

### Componentes
- PascalCase para nomes de componentes
- Arquivos `.tsx` para componentes React
- Arquivos `.ts` para utilitários e tipos

### Branches
- `feature/nome-da-feature` - Para novas funcionalidades
- `fix/nome-do-bug` - Para correções
- `refactor/nome-da-refatoracao` - Para refatorações

## 🎯 Próximos Passos

1. Implementar dashboard principal (Task 9)
2. Criar sistema de listagem de tarefas
3. Desenvolver formulários de criação/edição
4. Implementar funcionalidades de CRUD completo
5. Adicionar testes unitários
6. Otimizar performance e acessibilidade