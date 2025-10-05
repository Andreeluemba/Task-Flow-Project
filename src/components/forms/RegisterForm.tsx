import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { registerSchema, type RegisterFormData, type RegisterFormProps } from '../../types';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading,
  error
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nome
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Digite seu nome completo"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="Digite seu email"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Senha
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="Digite sua senha (mínimo 6 caracteres)"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.password ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Senha
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          placeholder="Confirme sua senha"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!isValid || loading}
        className="w-full"
      >
        {loading ? 'Criando conta...' : 'Criar conta'}
      </Button>
    </form>
  );
};