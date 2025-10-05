// Example usage of API services in React components
// This file demonstrates how to use the services we just created

import { AuthService, TaskService } from './index';
import { ErrorHandler } from '../utils/errorHandler';
import type { LoginCredentials, RegisterData, TaskFormData } from '../types';

/**
 * Example: Login functionality
 */
export const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await AuthService.login(credentials);
    console.log('Login successful:', response.user);
    return response;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Login failed:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Register functionality
 */
export const handleRegister = async (userData: RegisterData) => {
  try {
    const response = await AuthService.register(userData);
    console.log('Registration successful:', response.user);
    return response;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Registration failed:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Logout functionality
 */
export const handleLogout = async () => {
  try {
    await AuthService.logout();
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', ErrorHandler.getUserFriendlyMessage(error));
    // Continue with logout even if server call fails
  }
};

/**
 * Example: Fetch tasks functionality
 */
export const handleFetchTasks = async () => {
  try {
    const tasks = await TaskService.getTasks();
    console.log('Tasks fetched:', tasks.length);
    return tasks;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Failed to fetch tasks:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Create task functionality
 */
export const handleCreateTask = async (taskData: TaskFormData) => {
  try {
    const task = await TaskService.createTask(taskData);
    console.log('Task created:', task);
    return task;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Failed to create task:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Update task functionality
 */
export const handleUpdateTask = async (id: string, taskData: Partial<TaskFormData>) => {
  try {
    const task = await TaskService.updateTask(id, taskData);
    console.log('Task updated:', task);
    return task;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Failed to update task:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Toggle task completion
 */
export const handleToggleTaskComplete = async (id: string) => {
  try {
    const task = await TaskService.toggleTaskComplete(id);
    console.log('Task toggled:', task);
    return task;
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Failed to toggle task:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Delete task functionality
 */
export const handleDeleteTask = async (id: string) => {
  try {
    await TaskService.deleteTask(id);
    console.log('Task deleted');
  } catch (error) {
    const friendlyMessage = ErrorHandler.getUserFriendlyMessage(error);
    console.error('Failed to delete task:', friendlyMessage);
    throw error;
  }
};

/**
 * Example: Check authentication status
 */
export const checkAuthStatus = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getCurrentUser();
  const token = AuthService.getToken();
  
  console.log('Auth status:', { isAuthenticated, user, hasToken: !!token });
  return { isAuthenticated, user, hasToken: !!token };
};

/**
 * Example: Handle API errors in components
 */
export const handleApiError = (error: any, context: string) => {
  ErrorHandler.logError(error, context);
  
  if (ErrorHandler.isAuthError(error)) {
    // Redirect to login
    console.log('Authentication error - redirecting to login');
    return 'auth_error';
  }
  
  if (ErrorHandler.isNetworkError(error)) {
    // Show network error message
    console.log('Network error - check connection');
    return 'network_error';
  }
  
  if (ErrorHandler.isValidationError(error)) {
    // Show validation errors
    console.log('Validation error:', ErrorHandler.getErrorMessage(error));
    return 'validation_error';
  }
  
  // Generic error
  console.log('Generic error:', ErrorHandler.getUserFriendlyMessage(error));
  return 'generic_error';
};