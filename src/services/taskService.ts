import api from './api';
import type { Task, TaskFormData, TaskStatus } from '../types';

export class TaskService {
  /**
   * Get all tasks for the authenticated user
   */
  static async getTasks(): Promise<Task[]> {
    try {
      const response = await api.get<{ tasks: Task[] }>('/tasks');
      return response.data.tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a specific task by ID
   */
  static async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<{ task: Task }>(`/tasks/${id}`);
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new task
   */
  static async createTask(taskData: TaskFormData): Promise<Task> {
    try {
      const response = await api.post<{ task: Task }>('/tasks', {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || 'pending',
      });
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update an existing task
   */
  static async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<Task> {
    try {
      const response = await api.put<{ task: Task }>(`/tasks/${id}`, taskData);
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update task status only
   */
  static async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    try {
      const response = await api.patch<{ task: Task }>(`/tasks/${id}/status`, {
        status,
      });
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Toggle task completion status
   */
  static async toggleTaskComplete(id: string): Promise<Task> {
    try {
      const response = await api.patch<{ task: Task }>(`/tasks/${id}/toggle`);
      return response.data.task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a task
   */
  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get tasks filtered by status
   */
  static async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    try {
      const response = await api.get<{ tasks: Task[] }>(`/tasks?status=${status}`);
      return response.data.tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search tasks by title or description
   */
  static async searchTasks(query: string): Promise<Task[]> {
    try {
      const response = await api.get<{ tasks: Task[] }>(`/tasks/search?q=${encodeURIComponent(query)}`);
      return response.data.tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk update multiple tasks
   */
  static async bulkUpdateTasks(updates: Array<{ id: string; data: Partial<TaskFormData> }>): Promise<Task[]> {
    try {
      const response = await api.patch<{ tasks: Task[] }>('/tasks/bulk', {
        updates,
      });
      return response.data.tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk delete multiple tasks
   */
  static async bulkDeleteTasks(taskIds: string[]): Promise<void> {
    try {
      await api.delete('/tasks/bulk', {
        data: { taskIds },
      });
    } catch (error) {
      throw error;
    }
  }
}