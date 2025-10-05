import { create } from 'zustand';
import { TaskService } from '../services/taskService';
import { ErrorHandler } from '../utils/errorHandler';
import { useNotificationStore } from './notificationStore';
import type { Task, TaskFormData, TaskFilter, TaskState, TaskStatus } from '../types';

interface TaskStore extends TaskState {
  // Actions
  fetchTasks: () => Promise<void>;
  createTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (id: string, taskData: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Computed getters
  getFilteredTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getTaskCounts: () => { all: number; pending: number; completed: number };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,

  // Actions
  fetchTasks: async () => {
    set({ loading: true, error: null });
    
    try {
      const tasks = await TaskService.getTasks();
      
      set({
        tasks,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });

      // Show error notification for fetch failures
      useNotificationStore.getState().showError(
        'Erro ao carregar tarefas',
        errorMessage
      );
      
      throw error;
    }
  },

  createTask: async (taskData: TaskFormData) => {
    set({ loading: true, error: null });
    
    try {
      const newTask = await TaskService.createTask(taskData);
      
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
        error: null,
      }));

      // Show success notification
      useNotificationStore.getState().showSuccess(
        'Tarefa criada!',
        `A tarefa "${newTask.title}" foi criada com sucesso.`
      );
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });

      // Show error notification
      useNotificationStore.getState().showError(
        'Erro ao criar tarefa',
        errorMessage
      );
      
      throw error;
    }
  },

  updateTask: async (id: string, taskData: Partial<TaskFormData>) => {
    set({ loading: true, error: null });
    
    try {
      const updatedTask = await TaskService.updateTask(id, taskData);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        loading: false,
        error: null,
      }));

      // Show success notification
      useNotificationStore.getState().showSuccess(
        'Tarefa atualizada!',
        `A tarefa "${updatedTask.title}" foi atualizada com sucesso.`
      );
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });

      // Show error notification
      useNotificationStore.getState().showError(
        'Erro ao atualizar tarefa',
        errorMessage
      );
      
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    const taskToDelete = get().getTaskById(id);
    set({ loading: true, error: null });
    
    try {
      await TaskService.deleteTask(id);
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
        error: null,
      }));

      // Show success notification
      useNotificationStore.getState().showSuccess(
        'Tarefa excluída!',
        taskToDelete ? `A tarefa "${taskToDelete.title}" foi excluída.` : 'Tarefa excluída com sucesso.'
      );
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });

      // Show error notification
      useNotificationStore.getState().showError(
        'Erro ao excluir tarefa',
        errorMessage
      );
      
      throw error;
    }
  },

  toggleTaskComplete: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      const updatedTask = await TaskService.toggleTaskComplete(id);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        loading: false,
        error: null,
      }));

      // Show success notification
      const statusMessage = updatedTask.status === 'completed' ? 'concluída' : 'reaberta';
      useNotificationStore.getState().showSuccess(
        `Tarefa ${statusMessage}!`,
        `A tarefa "${updatedTask.title}" foi ${statusMessage}.`
      );
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });

      // Show error notification
      useNotificationStore.getState().showError(
        'Erro ao alterar status da tarefa',
        errorMessage
      );
      
      throw error;
    }
  },

  updateTaskStatus: async (id: string, status: TaskStatus) => {
    set({ loading: true, error: null });
    
    try {
      const updatedTask = await TaskService.updateTaskStatus(id, status);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = ErrorHandler.getUserFriendlyMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  setFilter: (filter: TaskFilter) => {
    set({ filter });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // Computed getters
  getFilteredTasks: () => {
    const { tasks, filter } = get();
    
    switch (filter) {
      case 'pending':
        return tasks.filter((task) => task.status === 'pending' || task.status === 'in_progress');
      case 'completed':
        return tasks.filter((task) => task.status === 'completed');
      case 'all':
      default:
        return tasks;
    }
  },

  getTaskById: (id: string) => {
    const { tasks } = get();
    return tasks.find((task) => task.id === id);
  },

  getTaskCounts: () => {
    const { tasks } = get();
    
    return {
      all: tasks.length,
      pending: tasks.filter((task) => task.status === 'pending' || task.status === 'in_progress').length,
      completed: tasks.filter((task) => task.status === 'completed').length,
    };
  },
}));