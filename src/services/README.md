# API Services

This directory contains all API-related services for the Task Management System frontend.

## Structure

```
src/services/
├── api.ts              # Axios configuration with interceptors
├── authService.ts      # Authentication service methods
├── taskService.ts      # Task CRUD service methods
├── index.ts           # Service exports
├── example-usage.ts   # Usage examples
└── README.md          # This file
```

## Services

### AuthService

Handles all authentication-related operations:

- `login(credentials)` - Authenticate user
- `register(userData)` - Register new user
- `logout()` - Logout and clear session
- `refreshToken()` - Refresh authentication token
- `getCurrentUser()` - Get user from localStorage
- `getToken()` - Get auth token from localStorage
- `isAuthenticated()` - Check if user is authenticated
- `verifyToken()` - Verify token with server

### TaskService

Handles all task-related CRUD operations:

- `getTasks()` - Get all user tasks
- `getTaskById(id)` - Get specific task
- `createTask(taskData)` - Create new task
- `updateTask(id, taskData)` - Update existing task
- `updateTaskStatus(id, status)` - Update task status only
- `toggleTaskComplete(id)` - Toggle task completion
- `deleteTask(id)` - Delete task
- `getTasksByStatus(status)` - Filter tasks by status
- `searchTasks(query)` - Search tasks
- `bulkUpdateTasks(updates)` - Bulk update multiple tasks
- `bulkDeleteTasks(taskIds)` - Bulk delete multiple tasks

## API Configuration

The `api.ts` file configures Axios with:

- Base URL from environment variables
- Request timeout (10 seconds)
- Automatic token injection in headers
- Response interceptors for error handling
- Automatic token refresh on 401 errors

## Error Handling

All services use the `ErrorHandler` utility for consistent error handling:

- Network error detection
- Authentication error handling
- Validation error processing
- User-friendly error messages
- Error logging for debugging

## Usage Examples

```typescript
import { AuthService, TaskService } from './services';
import { ErrorHandler } from './utils/errorHandler';

// Login
try {
  const response = await AuthService.login({ email, password });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error(ErrorHandler.getUserFriendlyMessage(error));
}

// Create task
try {
  const task = await TaskService.createTask({
    title: 'New Task',
    description: 'Task description'
  });
  console.log('Task created:', task);
} catch (error) {
  console.error(ErrorHandler.getUserFriendlyMessage(error));
}
```

## Environment Variables

Required environment variables:

- `VITE_API_URL` - Backend API base URL (default: http://localhost:3000/api)

## Token Management

- Tokens are stored in localStorage
- Automatic token injection in request headers
- Automatic token refresh on expiration
- Automatic logout on refresh failure

## Requirements Covered

This implementation covers the following requirements:

- **1.2**: User authentication with login/logout
- **2.2**: User registration functionality
- **4.3**: Task creation and management
- **5.2**: Task editing capabilities
- **6.4**: Task status updates
- **7.2**: Task deletion
- **11.2**: Session persistence with tokens
- **11.3**: Automatic token refresh and logout