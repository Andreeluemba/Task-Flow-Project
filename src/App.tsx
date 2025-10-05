import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, NotFoundPage } from './pages';
import { useAuthStore } from './store/authStore';
import ToastContainer from './components/ui/ToastContainer';
import { useNotificationStore } from './store/notificationStore';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Temporary Dashboard component - will be implemented in later tasks
const DashboardPage: React.FC = () => {
  const { logout, user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Sistema de Tarefas
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, {user?.name}!
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard (Em desenvolvimento)
          </h2>
          <p className="text-gray-600">
            Esta página será implementada nas próximas tarefas.
          </p>
        </div>
      </main>
    </div>
  );
};

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Global Toast Container component
const GlobalToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotificationStore();
  
  return (
    <ToastContainer 
      toasts={toasts} 
      onRemoveToast={removeToast} 
    />
  );
};

function App() {
  const { checkAuth } = useAuthStore();

  // Check authentication status on app initialization
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - show 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        {/* Global toast notifications */}
        <GlobalToastContainer />
      </div>
    </Router>
  );
}

export default App;
