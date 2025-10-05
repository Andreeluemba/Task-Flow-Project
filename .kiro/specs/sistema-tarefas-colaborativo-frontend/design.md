# Design Document

## Overview

O frontend do Sistema de Tarefas Colaborativo será desenvolvido em React com TypeScript, utilizando Vite como bundler. A aplicação seguirá uma arquitetura baseada em componentes com gerenciamento de estado centralizado, roteamento protegido e design responsivo.

## Architecture

### Estrutura de Pastas
```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes básicos de UI
│   ├── forms/           # Componentes de formulário
│   └── layout/          # Componentes de layout
├── pages/               # Páginas da aplicação
├── hooks/               # Custom hooks
├── services/            # Serviços para API
├── store/               # Gerenciamento de estado
├── types/               # Definições de tipos TypeScript
├── utils/               # Funções utilitárias
└── styles/              # Estilos globais
```

### Tecnologias Principais
- **React 19** com TypeScript
- **React Router** para navegação
- **Zustand** para gerenciamento de estado
- **Axios** para requisições HTTP
- **Tailwind CSS** para estilização
- **React Hook Form** para formulários
- **Zod** para validação de dados

## Components and Interfaces

### Componentes de Layout
```typescript
// Layout principal da aplicação
interface AppLayoutProps {
  children: React.ReactNode;
}

// Header com navegação e logout
interface HeaderProps {
  user: User;
  onLogout: () => void;
}

// Sidebar para navegação (opcional)
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}
```

### Componentes de UI
```typescript
// Botão reutilizável
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Input reutilizável
interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  error?: string;
  required?: boolean;
}

// Modal reutilizável
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Card para exibir tarefas
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}
```

### Componentes de Formulário
```typescript
// Formulário de login
interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  loading: boolean;
  error?: string;
}

// Formulário de registro
interface RegisterFormProps {
  onSubmit: (userData: RegisterData) => void;
  loading: boolean;
  error?: string;
}

// Formulário de tarefa
interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
  loading: boolean;
}
```

### Páginas
```typescript
// Página de login
const LoginPage: React.FC = () => { ... }

// Página de registro
const RegisterPage: React.FC = () => { ... }

// Página principal com lista de tarefas
const DashboardPage: React.FC = () => { ... }

// Página de erro 404
const NotFoundPage: React.FC = () => { ... }
```

## Data Models

### Tipos de Dados
```typescript
// Usuário
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Tarefa
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Status da tarefa
type TaskStatus = 'pending' | 'in_progress' | 'completed';

// Filtros de tarefa
type TaskFilter = 'all' | 'pending' | 'completed';

// Credenciais de login
interface LoginCredentials {
  email: string;
  password: string;
}

// Dados de registro
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Dados do formulário de tarefa
interface TaskFormData {
  title: string;
  description: string;
  status?: TaskStatus;
}

// Estado de autenticação
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Estado das tarefas
interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
}
```

### Validação com Zod
```typescript
// Schema para login
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

// Schema para registro
const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});

// Schema para tarefa
const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória')
});
```

## Error Handling

### Estratégia de Tratamento de Erros
```typescript
// Tipos de erro
interface ApiError {
  message: string;
  status: number;
  field?: string;
}

// Hook para tratamento de erros
const useErrorHandler = () => {
  const showError = (error: ApiError) => {
    // Exibir toast ou notificação
  };
  
  const handleApiError = (error: any) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
    } else if (error.response?.status === 403) {
      // Mostrar erro de permissão
    } else {
      // Erro genérico
    }
  };
  
  return { showError, handleApiError };
};
```

### Boundary de Erro
```typescript
// Componente para capturar erros
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  // Implementação do error boundary
}
```

## Testing Strategy

### Estrutura de Testes
```
src/
├── __tests__/           # Testes unitários
├── components/
│   └── __tests__/       # Testes de componentes
├── pages/
│   └── __tests__/       # Testes de páginas
└── utils/
    └── __tests__/       # Testes de utilitários
```

### Tipos de Teste
1. **Testes Unitários**: Componentes isolados, hooks, utilitários
2. **Testes de Integração**: Fluxos completos de usuário
3. **Testes de API**: Mocking das chamadas para backend

### Ferramentas de Teste
- **Vitest** para execução de testes
- **React Testing Library** para testes de componentes
- **MSW** para mock de API
- **User Event** para simulação de interações

## State Management

### Zustand Store Structure
```typescript
// Store de autenticação
interface AuthStore {
  // Estado
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // Ações
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

// Store de tarefas
interface TaskStore {
  // Estado
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
  
  // Ações
  fetchTasks: () => Promise<void>;
  createTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
}
```

## API Integration

### Service Layer
```typescript
// Configuração do Axios
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Interceptor para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviços de API
class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> { ... }
  static async register(userData: RegisterData): Promise<AuthResponse> { ... }
  static async refreshToken(): Promise<AuthResponse> { ... }
}

class TaskService {
  static async getTasks(): Promise<Task[]> { ... }
  static async createTask(taskData: TaskFormData): Promise<Task> { ... }
  static async updateTask(id: string, taskData: Partial<Task>): Promise<Task> { ... }
  static async deleteTask(id: string): Promise<void> { ... }
}
```

## Routing

### Estrutura de Rotas
```typescript
// Configuração do React Router
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

// Componente de rota protegida
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuthStore();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return <Outlet />;
};
```

## Styling

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  },
  plugins: []
};
```

### Design System
- **Cores**: Paleta consistente com primary, secondary, success, warning, error
- **Tipografia**: Hierarquia clara com tamanhos definidos
- **Espaçamento**: Sistema baseado em múltiplos de 4px
- **Componentes**: Biblioteca de componentes reutilizáveis
- **Responsividade**: Mobile-first approach

## Performance Optimization

### Estratégias
1. **Code Splitting**: Lazy loading de páginas
2. **Memoization**: React.memo para componentes pesados
3. **Virtual Scrolling**: Para listas grandes de tarefas
4. **Debouncing**: Para filtros e busca
5. **Caching**: Cache de requisições com React Query (futuro)

### Bundle Optimization
```typescript
// Lazy loading de páginas
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    {/* rotas */}
  </Routes>
</Suspense>
```

## Security Considerations

### Medidas de Segurança
1. **Token Storage**: JWT em localStorage com expiração
2. **Route Protection**: Verificação de autenticação em rotas protegidas
3. **Input Validation**: Validação client-side com Zod
4. **XSS Prevention**: Sanitização de inputs
5. **HTTPS**: Comunicação segura com backend

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sistema de Tarefas
VITE_TOKEN_EXPIRY=24h
```