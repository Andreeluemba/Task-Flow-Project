import React from 'react';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-gray-500">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma tarefa encontrada
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          Você ainda não tem tarefas ou nenhuma tarefa corresponde ao filtro selecionado.
        </p>
        
        <div className="text-xs text-gray-400">
          <p>💡 Dica: Clique em "Nova Tarefa" para começar a organizar seu trabalho</p>
        </div>
      </div>
    );
  }

  // Sort tasks: pending/in_progress first, then completed
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to the end
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Among non-completed tasks, sort by creation date (newest first)
    if (a.status !== 'completed' && b.status !== 'completed') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    // Among completed tasks, sort by update date (most recently completed first)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-4">
      {/* Task count header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {tasks.length === 1 ? '1 tarefa' : `${tasks.length} tarefas`}
        </p>
        
        {tasks.length > 0 && (
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length > 0 && (
              <span>
                {tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length} pendente(s)
              </span>
            )}
            {tasks.filter(t => t.status === 'completed').length > 0 && (
              <span>
                {tasks.filter(t => t.status === 'completed').length} concluída(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Task cards */}
      <div className="grid gap-4">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>

      {/* Footer info for large lists */}
      {tasks.length > 10 && (
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Mostrando {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};