# Task Components

This directory contains all components related to task management functionality.

## Components

### TaskCard
Displays individual task information with actions for editing, deleting, and toggling completion status.

**Props:**
- `task: Task` - The task object to display
- `onEdit: (task: Task) => void` - Callback when edit button is clicked
- `onDelete: (id: string) => void` - Callback when delete button is clicked
- `onToggleComplete: (id: string) => void` - Callback when checkbox is toggled

**Features:**
- Visual status indicators (pending, in progress, completed)
- Checkbox for quick status toggle
- Strike-through text for completed tasks
- Formatted creation and update dates
- Edit and delete action buttons with icons

### TaskForm
Form component for creating and editing tasks with validation.

**Props:**
- `task?: Task` - Optional task object for editing (if not provided, creates new task)
- `onSubmit: (taskData: TaskFormData) => void` - Callback when form is submitted
- `onCancel: () => void` - Callback when cancel button is clicked
- `loading: boolean` - Loading state for submit button
- `isEdit?: boolean` - Whether this is an edit form (shows status field)

**Features:**
- Title and description fields with validation
- Character counters (100 for title, 500 for description)
- Status dropdown (only in edit mode)
- Form validation using Zod schema
- Loading states and error handling

### TaskList
Container component that displays a list of tasks with loading and empty states.

**Props:**
- `tasks: Task[]` - Array of tasks to display
- `loading: boolean` - Loading state
- `onEdit: (task: Task) => void` - Callback for editing tasks
- `onDelete: (id: string) => void` - Callback for deleting tasks
- `onToggleComplete: (id: string) => void` - Callback for toggling task completion

**Features:**
- Loading spinner during data fetch
- Empty state with helpful message
- Task count display
- Smart sorting (pending tasks first, then completed)
- Responsive grid layout

### TaskFilterComponent
Filter component for filtering tasks by status with visual counters.

**Props:**
- `currentFilter: TaskFilter` - Currently active filter
- `onFilterChange: (filter: TaskFilter) => void` - Callback when filter changes
- `taskCounts: { all: number; pending: number; completed: number }` - Task counts for each filter

**Features:**
- Filter buttons with icons and counts
- Visual active state indication
- Summary section with task statistics
- Accessible button states

## Usage Example

```tsx
import { TaskList, TaskFilterComponent, TaskForm } from './components/tasks';
import { Modal } from './components/ui/Modal';
import { useTaskStore } from './store/taskStore';

function TasksPage() {
  const {
    tasks,
    loading,
    filter,
    getFilteredTasks,
    getTaskCounts,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  } = useTaskStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await deleteTask(id);
    }
  };

  const handleFormSubmit = async (taskData: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await createTask(taskData);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Sidebar */}
      <div className="lg:col-span-1">
        <TaskFilterComponent
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />
      </div>

      {/* Task List */}
      <div className="lg:col-span-3">
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={toggleTaskComplete}
        />
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          loading={loading}
          isEdit={!!editingTask}
        />
      </Modal>
    </div>
  );
}
```

## Styling

All components use Tailwind CSS classes and follow the design system established in the UI components. They are fully responsive and include:

- Consistent spacing and typography
- Hover and focus states
- Loading and disabled states
- Accessible color contrasts
- Mobile-friendly layouts

## Accessibility

Components include proper accessibility features:

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly text
- Proper form labeling
- Focus management