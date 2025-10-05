# Authentication Forms

This directory contains form components for user authentication using React Hook Form and Zod validation.

## Components

### LoginForm
- Handles user login with email and password
- Validates input using Zod schema
- Shows loading states and error messages
- Integrates with AuthStore for authentication

### RegisterForm
- Handles user registration with name, email, password, and password confirmation
- Validates all inputs including password confirmation match
- Shows loading states and error messages
- Integrates with AuthStore for account creation

## Features

- **React Hook Form**: Efficient form handling with minimal re-renders
- **Zod Validation**: Type-safe validation with custom error messages
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Display of validation and API errors
- **Accessibility**: Proper labels and ARIA attributes
- **Responsive Design**: Mobile-friendly layouts with Tailwind CSS

## Usage

```tsx
import { LoginForm, RegisterForm } from './components/forms';
import { useAuthStore } from './store/authStore';

// Login Form
const LoginPage = () => {
  const { login, loading, error } = useAuthStore();
  
  return (
    <LoginForm
      onSubmit={login}
      loading={loading}
      error={error}
    />
  );
};

// Register Form
const RegisterPage = () => {
  const { register, loading, error } = useAuthStore();
  
  return (
    <RegisterForm
      onSubmit={register}
      loading={loading}
      error={error}
    />
  );
};
```

## Validation Rules

### Login Form
- Email: Must be valid email format
- Password: Minimum 6 characters

### Register Form
- Name: Minimum 2 characters
- Email: Must be valid email format
- Password: Minimum 6 characters
- Confirm Password: Must match password field