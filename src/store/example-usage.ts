/**
 * Example usage of the Zustand stores and custom hooks
 * This file demonstrates how to use the auth and task stores in components
 */

import { useAuth, useTasks, useTaskState, useTaskActions, useTaskCounts } from '../hooks';

// Example: Login component usage
export const ExampleLoginComponent = () => {
  const { login } = useAuth();
  
  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
      // User will be automatically redirected by route protection
    } catch (error) {
      // Error is already handled by the store and available in the error state
      console.error('Login failed:', error);
    }
  };
  
  // Component JSX would use loading, error, and handleLogin
  console.log('Login handler ready:', typeof handleLogin);
  return null; // Placeholder return
};

// Example: Dashboard component usage
export const ExampleDashboardComponent = () => {
  const { isAuthenticated } = useAuth();
  const { createTask, toggleTaskComplete, deleteTask } = useTasks();
  
  // Fetch tasks on component mount
  // In a real React component, you would use React.useEffect
  if (isAuthenticated) {
    console.log('User is authenticated, would fetch tasks');
  }
  
  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    try {
      await createTask(taskData);
      // Task is automatically added to the store
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  
  const handleToggleComplete = async (taskId: string) => {
    try {
      await toggleTaskComplete(taskId);
      // Task status is automatically updated in the store
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      // Task is automatically removed from the store
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  
  // Component JSX would use these values and handlers
  console.log('Dashboard handlers ready');
  console.log('Create task:', typeof handleCreateTask);
  console.log('Toggle complete:', typeof handleToggleComplete);
  console.log('Delete task:', typeof handleDeleteTask);
  
  return null; // Placeholder return
};

// Example: Using individual hooks for specific needs
export const ExampleTaskListComponent = () => {
  // Only need filtered tasks and counts
  const { filteredTasks, taskCounts, loading } = useTaskState();
  const { toggleTaskComplete, deleteTask } = useTaskActions();
  
  // Component only re-renders when these specific values change
  console.log('Filtered tasks:', filteredTasks.length);
  console.log('Task counts:', taskCounts);
  console.log('Loading:', loading);
  console.log('Toggle function:', typeof toggleTaskComplete);
  console.log('Delete function:', typeof deleteTask);
  
  // Use toggleTaskComplete and deleteTask functions
  return null; // Placeholder return
};

// Example: Using store selectors for performance
export const ExampleTaskCounterComponent = () => {
  // Only subscribe to task counts, not the entire task state
  const taskCounts = useTaskCounts();
  
  // This component only re-renders when task counts change
  // In a real component, you would return JSX here
  console.log('Task counts:', taskCounts);
  return null; // Placeholder return
};

// Example: Persistent session check on app initialization
export const ExampleAppInitialization = () => {
  const { checkAuth, isAuthenticated, loading } = useAuth();
  
  // In a real React component, you would use React.useEffect
  // React.useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);
  
  if (loading) {
    console.log('Loading...');
    return null;
  }
  
  // In a real component, render based on authentication state
  console.log('Authenticated:', isAuthenticated);
  console.log('Check auth function:', typeof checkAuth);
  return null; // Placeholder return
};