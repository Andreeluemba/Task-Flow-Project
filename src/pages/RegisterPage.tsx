import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/forms/RegisterForm';
import { useAuthStore } from '../store/authStore';
import type { RegisterData } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error, isAuthenticated, clearError } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleRegister = async (userData: RegisterData) => {
    try {
      await register(userData);
      // Navigation will happen automatically due to useEffect above
    } catch (error) {
      // Error is already handled in the store and displayed in the form
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              faça login na sua conta existente
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            error={error || undefined}
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};