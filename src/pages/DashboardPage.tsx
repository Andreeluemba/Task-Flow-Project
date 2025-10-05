import React, { useState, useEffect } from 'react';
import { TaskList, TaskFilterComponent, TaskForm } from '../components/tasks';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import type { Task, TaskFormData } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    filteredTasks,
    taskCounts,
    filter,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setFilter,
    clearError
  } = useTasks();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Form loading states
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks().catch((error) => {
      console.error('Failed to fetch tasks:', error);
    });
  }, [fetchTasks]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Handle create task
  const handleCreateTask = async (taskData: TaskFormData) => {
    setIsCreating(true);
    try {
      await createTask(taskData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!taskToEdit) return;
    
    setIsUpdating(true);
    try {
      await updateTask(taskToEdit.id, taskData);
      setIsEditModalOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete task
  const handleDeleteTask = (taskId: string) => {
    const task = filteredTasks.find(t => t.id === taskId);
    if (task) {
      setTaskToDelete(task);
      setIsDeleteConfirmOpen(true);
    }
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete.id);
      setIsDeleteConfirmOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle toggle task completion
  const handleToggleComplete = async (taskId: string) => {
    try {
      await toggleTaskComplete(taskId);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  // Close modals
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Minhas Tarefas"
        subtitle={user ? `Bem-vindo(a), ${user.name}` : undefined}
        actions={
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nova Tarefa</span>
          </Button>
        }
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskFilterComponent
                currentFilter={filter}
                onFilterChange={setFilter}
                taskCounts={taskCounts}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Error state */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Erro ao carregar tarefas
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          clearError();
                          fetchTasks();
                        }}
                      >
                        Tentar novamente
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <TaskList
                tasks={filteredTasks}
                loading={loading}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Nova Tarefa"
        size="md"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={closeCreateModal}
          loading={isCreating}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Editar Tarefa"
        size="md"
      >
        {taskToEdit && (
          <TaskForm
            task={taskToEdit}
            onSubmit={handleUpdateTask}
            onCancel={closeEditModal}
            loading={isUpdating}
            isEdit={true}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Excluir tarefa
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Tem certeza que deseja excluir a tarefa "{taskToDelete?.title}"? Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={closeDeleteConfirm}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteTask}
              loading={isDeleting}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};