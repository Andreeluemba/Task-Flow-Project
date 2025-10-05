import React from 'react';
import { LoginForm, RegisterForm } from './index';
import { useAuthStore } from '../../store/authStore';

// Example usage of LoginForm
export const LoginExample: React.FC = () => {
  const { login, loading, error } = useAuthStore();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <LoginForm
        onSubmit={login}
        loading={loading}
        error={error || undefined}
      />
      <p className="mt-4 text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <a href="/register" className="text-blue-600 hover:text-blue-500">
          Registre-se aqui
        </a>
      </p>
    </div>
  );
};

// Example usage of RegisterForm
export const RegisterExample: React.FC = () => {
  const { register, loading, error } = useAuthStore();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
      <RegisterForm
        onSubmit={register}
        loading={loading}
        error={error || undefined}
      />
      <p className="mt-4 text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a href="/login" className="text-blue-600 hover:text-blue-500">
          Faça login aqui
        </a>
      </p>
    </div>
  );
};

// Example of form integration with custom error handling
export const LoginWithCustomHandling: React.FC = () => {
  const { login, loading, error, clearError } = useAuthStore();

  const handleLogin = async (credentials: any) => {
    try {
      clearError(); // Clear any previous errors
      await login(credentials);
      // Handle successful login (e.g., redirect)
      console.log('Login successful!');
    } catch (err) {
      // Error is already handled by the store
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error || undefined}
      />
    </div>
  );
};