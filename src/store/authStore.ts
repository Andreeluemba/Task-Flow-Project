import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/authService';
import { ErrorHandler } from '../utils/errorHandler';
import { useNotificationStore } from './notificationStore';
import type { LoginCredentials, RegisterData, AuthState } from '../types';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ loading: true, error: null });
        
        try {
          const response = await AuthService.login(credentials);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          // Show success notification
          useNotificationStore.getState().showSuccess(
            'Login realizado com sucesso!',
            `Bem-vindo(a), ${response.user.name}!`
          );
        } catch (error) {
          const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: errorMessage,
          });

          // Show error notification
          useNotificationStore.getState().showError(
            'Erro no login',
            errorMessage
          );
          
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ loading: true, error: null });
        
        try {
          const response = await AuthService.register(userData);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          // Show success notification
          useNotificationStore.getState().showSuccess(
            'Conta criada com sucesso!',
            `Bem-vindo(a), ${response.user.name}!`
          );
        } catch (error) {
          const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: errorMessage,
          });

          // Show error notification
          useNotificationStore.getState().showError(
            'Erro no registro',
            errorMessage
          );
          
          throw error;
        }
      },

      logout: () => {
        // Call logout service (fire and forget)
        AuthService.logout().catch(console.error);
        
        // Clear state immediately
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });

        // Show logout notification
        useNotificationStore.getState().showInfo(
          'Logout realizado',
          'Você foi desconectado com sucesso'
        );
      },

      checkAuth: async () => {
        const token = AuthService.getToken();
        const user = AuthService.getCurrentUser();
        
        if (!token || !user) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });
          return;
        }

        set({ loading: true });
        
        try {
          // Verify token with server
          const verifiedUser = await AuthService.verifyToken();
          
          set({
            user: verifiedUser,
            token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          // Token is invalid, clear everything
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Only persist essential data
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);