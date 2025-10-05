import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types';

/**
 * Custom hook for task operations
 * Provides a clean interface to task store functionality
 */
export const useTasks = () => {
  const {
    tasks,
    filter,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateTaskStatus,
    setFilter,
    clearError,
    setLoading,
    getFilteredTasks,
    getTaskById,
    getTaskCounts,
  } = useTaskStore();

  return {
    // State
    tasks,
    filter,
    loading,
    error,
    
    // Actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateTaskStatus,
    setFilter,
    clearError,
    setLoading,
    
    // Computed values
    filteredTasks: getFilteredTasks(),
    taskCounts: getTaskCounts(),
    hasError: !!error,
    hasTasks: tasks.length > 0,
    
    // Utility functions
    getTaskById,
  };
};

/**
 * Hook to get only task state (no actions)
 * Useful for components that only need to read task state
 */
export const useTaskState = () => {
  const { tasks, filter, loading, error, getFilteredTasks, getTaskCounts } = useTaskStore();
  
  return {
    tasks,
    filter,
    loading,
    error,
    filteredTasks: getFilteredTasks(),
    taskCounts: getTaskCounts(),
    hasError: !!error,
    hasTasks: tasks.length > 0,
  };
};

/**
 * Hook to get only task actions (no state)
 * Useful for components that only need to perform task actions
 */
export const useTaskActions = () => {
  const {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateTaskStatus,
    setFilter,
    clearError,
    setLoading,
  } = useTaskStore();
  
  return {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateTaskStatus,
    setFilter,
    clearError,
    setLoading,
  };
};

/**
 * Hook to get a specific task by ID
 * Returns undefined if task not found
 */
export const useTask = (id: string): Task | undefined => {
  return useTaskStore((state) => state.getTaskById(id));
};

/**
 * Hook to get filtered tasks based on current filter
 */
export const useFilteredTasks = (): Task[] => {
  return useTaskStore((state) => state.getFilteredTasks());
};

/**
 * Hook to get task counts for different filters
 */
export const useTaskCounts = () => {
  return useTaskStore((state) => state.getTaskCounts());
};

/**
 * Hook for task filter operations
 */
export const useTaskFilter = () => {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);
  const getTaskCounts = useTaskStore((state) => state.getTaskCounts);
  
  return {
    currentFilter: filter,
    setFilter,
    taskCounts: getTaskCounts(),
    
    // Filter helpers
    showAll: () => setFilter('all'),
    showPending: () => setFilter('pending'),
    showCompleted: () => setFilter('completed'),
    
    // Filter state checks
    isShowingAll: filter === 'all',
    isShowingPending: filter === 'pending',
    isShowingCompleted: filter === 'completed',
  };
};