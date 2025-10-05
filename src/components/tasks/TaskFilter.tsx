import React from 'react';
import type { TaskFilter } from '../../types';

interface TaskFilterProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilterComponent: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts
}) => {
  const filterOptions = [
    {
      value: 'all' as TaskFilter,
      label: 'Todas',
      count: taskCounts.all,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      value: 'pending' as TaskFilter,
      label: 'Pendentes',
      count: taskCounts.pending,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: 'completed' as TaskFilter,
      label: 'Concluídas',
      count: taskCounts.completed,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Filtrar Tarefas</h3>
      
      <div className="space-y-2">
        {filterOptions.map((option) => {
          const isActive = currentFilter === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center space-x-2">
                <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                  {option.icon}
                </span>
                <span>{option.label}</span>
              </div>
              
              <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full
                ${isActive 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-100 text-gray-600'
                }`}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Total de tarefas:</span>
            <span className="font-medium">{taskCounts.all}</span>
          </div>
          {taskCounts.pending > 0 && (
            <div className="flex justify-between">
              <span>Pendentes:</span>
              <span className="font-medium text-yellow-600">{taskCounts.pending}</span>
            </div>
          )}
          {taskCounts.completed > 0 && (
            <div className="flex justify-between">
              <span>Concluídas:</span>
              <span className="font-medium text-green-600">{taskCounts.completed}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};