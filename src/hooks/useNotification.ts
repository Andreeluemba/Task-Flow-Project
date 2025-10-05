import { useNotificationStore } from '../store/notificationStore';

export interface NotificationOptions {
  title: string;
  message?: string;
  duration?: number;
}

export const useNotification = () => {
  const {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  } = useNotificationStore();

  const notify = {
    success: (title: string, message?: string) => showSuccess(title, message),
    error: (title: string, message?: string) => showError(title, message),
    warning: (title: string, message?: string) => showWarning(title, message),
    info: (title: string, message?: string) => showInfo(title, message),
    
    // Método customizado para mais controle
    custom: (options: NotificationOptions & { type: 'success' | 'error' | 'warning' | 'info' }) => {
      addToast({
        type: options.type,
        title: options.title,
        message: options.message,
        duration: options.duration,
      });
    },
  };

  return {
    toasts,
    notify,
    removeToast,
    clearAllToasts,
  };
};