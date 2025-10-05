import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Página não encontrada
          </h2>
          <p className="mt-2 text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full">
              Voltar ao início
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full">
              Fazer login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};