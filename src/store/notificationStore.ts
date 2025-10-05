import { create } from 'zustand';
import type { ToastData } from '../components/ui/ToastContainer';

interface NotificationStore {
    toasts: ToastData[];
    addToast: (toast: Omit<ToastData, 'id'>) => void;
    removeToast: (id: string) => void;
    clearAllToasts: () => void;
    showSuccess: (title: string, message?: string) => void;
    showError: (title: string, message?: string) => void;
    showWarning: (title: string, message?: string) => void;
    showInfo: (title: string, message?: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    toasts: [],

    addToast: (toast) => {
        const id = generateId();
        const newToast: ToastData = {
            id,
            duration: 5000,
            ...toast,
        };

        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },

    clearAllToasts: () => {
        set({ toasts: [] });
    },

    showSuccess: (title, message) => {
        get().addToast({
            type: 'success',
            title,
            message,
        });
    },

    showError: (title, message) => {
        get().addToast({
            type: 'error',
            title,
            message,
            duration: 7000, // Erros ficam mais tempo na tela
        });
    },

    showWarning: (title, message) => {
        get().addToast({
            type: 'warning',
            title,
            message,
        });
    },

    showInfo: (title, message) => {
        get().addToast({
            type: 'info',
            title,
            message,
        });
    },
}));