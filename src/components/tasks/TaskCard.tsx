import React from 'react';
import { Button } from '../ui/Button';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const isCompleted = task.status === 'completed';

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'pending':
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'completed':
        return 'Concluída';
      case 'in_progress':
        return 'Em Progresso';
      case 'pending':
      default:
        return 'Pendente';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 transition-all hover:shadow-md ${
      isCompleted ? 'opacity-75' : ''
    }`}>
      {/* Header with checkbox and status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            aria-label={`Marcar tarefa "${task.title}" como ${isCompleted ? 'pendente' : 'concluída'}`}
          />
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className={`text-sm ${
          isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
        }`}>
          {task.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>Criada em: {formatDate(task.createdAt)}</span>
        {task.updatedAt !== task.createdAt && (
          <span>Atualizada em: {formatDate(task.updatedAt)}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </Button>
        
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Excluir
        </Button>
      </div>
    </div>
  );
};