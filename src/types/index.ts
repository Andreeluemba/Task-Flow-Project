import { z } from 'zod';

// ============================================================================
// Core Data Models
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type TaskFilter = 'all' | 'pending' | 'completed';

// ============================================================================
// Authentication Types
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============================================================================
// Form Data Types
// ============================================================================

export interface TaskFormData {
  title: string;
  description: string;
  status?: TaskStatus;
}

// ============================================================================
// State Management Types
// ============================================================================

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// API Error Types
// ============================================================================

export interface ApiError {
  message: string;
  status: number;
  field?: string;
}

// ============================================================================
// Zod Validation Schemas
// ============================================================================

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

// Register validation schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});

// Task validation schema
export const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
  status: z.enum(['pending', 'in_progress', 'completed']).optional()
});

// Type inference from Zod schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TaskFormValidation = z.infer<typeof taskSchema>;

// ============================================================================
// Component Props Types
// ============================================================================

// Layout Component Props
export interface AppLayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Form Component Props
export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  loading: boolean;
  error?: string;
}

export interface RegisterFormProps {
  onSubmit: (userData: RegisterData) => void;
  loading: boolean;
  error?: string;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
  loading: boolean;
  isEdit?: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface TaskFilterProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

// Notification/Toast Props
export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

// Error Boundary Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

// Hook Return Types
export interface UseNotificationReturn {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

export interface UseErrorHandlerReturn {
  showError: (error: ApiError) => void;
  handleApiError: (error: any) => void;
  clearError: () => void;
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}