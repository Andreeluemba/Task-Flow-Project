# UI Components

This directory contains reusable UI components that form the foundation of the application's interface.

## Components

### Button
A versatile button component with multiple variants and states.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean (default: false)
- `children`: React.ReactNode
- All standard button HTML attributes

**Usage:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="danger" loading={isDeleting} onClick={handleDelete}>
  Delete Task
</Button>
```

### Input
A form input component with label, validation, and error handling.

**Props:**
- `label`: string (required)
- `error`: string (optional)
- `helperText`: string (optional)
- All standard input HTML attributes

**Usage:**
```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  required
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### Modal
A modal dialog component for overlays and confirmations.

**Props:**
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `title`: string (required)
- `children`: React.ReactNode (required)
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `showCloseButton`: boolean (default: true)

**Usage:**
```tsx
import { Modal } from '@/components/ui';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Deletion"
  size="sm"
>
  <p>Are you sure you want to delete this task?</p>
  <div className="flex gap-2 mt-4">
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

### LoadingSpinner
A loading spinner component for indicating loading states.

**Props:**
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string (optional)

**Usage:**
```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner size="lg" />

// Or inline with text
<div className="flex items-center gap-2">
  <LoadingSpinner size="sm" />
  <span>Loading tasks...</span>
</div>
```

### Toast
A notification toast component for displaying feedback messages.

**Props:**
- `id`: string (required)
- `type`: 'success' | 'error' | 'warning' | 'info' (required)
- `title`: string (required)
- `message`: string (optional)
- `duration`: number (default: 5000ms)
- `onClose`: (id: string) => void (required)

**Usage:**
```tsx
import { Toast } from '@/components/ui';

<Toast
  id="toast-1"
  type="success"
  title="Task Created"
  message="Your task has been created successfully"
  onClose={handleClose}
/>
```

### ToastContainer
A container component that manages and displays multiple toast notifications.

**Props:**
- `toasts`: ToastData[] (required)
- `onRemoveToast`: (id: string) => void (required)

**Usage:**
```tsx
import { ToastContainer } from '@/components/ui';
import { useNotification } from '@/hooks';

const App = () => {
  const { toasts, removeToast } = useNotification();
  
  return (
    <div>
      {/* Your app content */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};
```

## Design System

All components follow the application's design system:

- **Colors**: Primary (blue), secondary (gray), danger (red)
- **Spacing**: Consistent padding and margins using Tailwind classes
- **Typography**: Consistent font sizes and weights
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Responsive**: Mobile-first design with responsive breakpoints

## Accessibility Features

- Proper semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management (especially in Modal)
- Color contrast compliance

## Testing

Each component includes comprehensive unit tests covering:
- Rendering with different props
- User interactions
- Accessibility features
- Error states
- Loading states

Run tests with: `npm test src/components/ui/`