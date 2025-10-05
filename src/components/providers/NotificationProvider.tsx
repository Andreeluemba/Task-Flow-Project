import React from 'react';
import ToastContainer from '../ui/ToastContainer';
import { useNotification } from '../../hooks/useNotification';

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { toasts, removeToast } = useNotification();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
};

export default NotificationProvider;