# Zustand Store Implementation

This directory contains the Zustand stores for state management in the task management application.

## Stores

### AuthStore (`authStore.ts`)
Manages authentication state and operations:

**State:**
- `user`: Current authenticated user
- `token`: JWT authentication token
- `isAuthenticated`: Boolean authentication status
- `loading`: Loading state for auth operations
- `error`: Error messages from auth operations

**Actions:**
- `login(credentials)`: Authenticate user
- `register(userData)`: Register new user
- `logout()`: Sign out user and clear data
- `checkAuth()`: Verify existing session
- `clearError()`: Clear error state
- `setLoading(loading)`: Set loading state

**Features:**
- Automatic token persistence in localStorage
- Token validation with server
- Error handling with user-friendly messages
- Automatic cleanup on logout

### TaskStore (`taskStore.ts`)
Manages task data and operations:

**State:**
- `tasks`: Array of user tasks
- `filter`: Current filter ('all', 'pending', 'completed')
- `loading`: Loading state for task operations
- `error`: Error messages from task operations

**Actions:**
- `fetchTasks()`: Load all user tasks
- `createTask(taskData)`: Create new task
- `updateTask(id, taskData)`: Update existing task
- `deleteTask(id)`: Delete task
- `toggleTaskComplete(id)`: Toggle task completion
- `updateTaskStatus(id, status)`: Update task status
- `setFilter(filter)`: Change task filter
- `clearError()`: Clear error state

**Computed Values:**
- `getFilteredTasks()`: Get tasks based on current filter
- `getTaskById(id)`: Find specific task
- `getTaskCounts()`: Get counts for all filter types

## Custom Hooks

### Authentication Hooks (`../hooks/useAuth.ts`)

- `useAuth()`: Complete auth interface with state and actions
- `useAuthState()`: Read-only auth state
- `useAuthActions()`: Auth actions only
- `useCurrentUser()`: Current user data

### Task Hooks (`../hooks/useTasks.ts`)

- `useTasks()`: Complete task interface with state and actions
- `useTaskState()`: Read-only task state
- `useTaskActions()`: Task actions only
- `useTask(id)`: Specific task by ID
- `useFilteredTasks()`: Tasks based on current filter
- `useTaskCounts()`: Task counts for filters
- `useTaskFilter()`: Filter operations and state

## Usage Examples

### Basic Authentication
```typescript
import { useAuth } from '../hooks';

const LoginComponent = () => {
  const { login, loading, error } = useAuth();
  
  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      // Redirect handled by route protection
    } catch (error) {
      // Error displayed via error state
    }
  };
};
```

### Task Management
```typescript
import { useTasks, useTaskFilter } from '../hooks';

const TaskListComponent = () => {
  const { 
    filteredTasks, 
    loading, 
    createTask, 
    toggleTaskComplete 
  } = useTasks();
  
  const { currentFilter, setFilter, taskCounts } = useTaskFilter();
  
  // Use filteredTasks, loading state, and actions
};
```

### Performance Optimization
```typescript
// Only subscribe to specific data
const taskCounts = useTaskCounts();
const currentUser = useCurrentUser();

// Component only re-renders when these specific values change
```

## Persistence

### AuthStore Persistence
- Uses Zustand's `persist` middleware
- Stores `user`, `token`, and `isAuthenticated` in localStorage
- Automatically restores state on app reload
- Excludes temporary state like `loading` and `error`

### TaskStore
- No persistence (tasks are fetched from server)
- Filter preference could be added to localStorage if needed

## Error Handling

Both stores use the centralized error handler (`../utils/errorHandler.ts`) to:
- Convert API errors to user-friendly messages
- Handle different error types (network, validation, server)
- Provide consistent error format across the app

## Integration with Services

Stores integrate with service layer:
- `AuthStore` → `AuthService`
- `TaskStore` → `TaskService`

Services handle API communication while stores manage state and UI concerns.

## Type Safety

All stores are fully typed with TypeScript:
- State interfaces defined in `../types/index.ts`
- Actions have proper parameter and return types
- Custom hooks provide type-safe interfaces

## Testing Considerations

Stores can be tested by:
1. Testing individual actions in isolation
2. Testing state updates after actions
3. Mocking service layer for unit tests
4. Testing persistence behavior
5. Testing error handling scenarios