import api from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export class AuthService {
  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      // Store tokens in localStorage
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register new user account
   */
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      
      // Store tokens in localStorage
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user and clear stored data
   */
  static async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn('Logout request failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      
      // Update stored tokens
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      // Clear invalid tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw error;
    }
  }

  /**
   * Get current user from localStorage
   */
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  /**
   * Get current token from localStorage
   */
  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Verify token validity with server
   */
  static async verifyToken(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>('/auth/verify');
      
      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error) {
      // Token is invalid, clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw error;
    }
  }
}