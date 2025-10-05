import React from 'react';
import { useNotification } from '../../hooks/useNotification';
import { Button } from './Button';

/**
 * Example component demonstrating how to use the notification system
 * This file is for reference and testing purposes
 */
const NotificationExamples: React.FC = () => {
    const { notify } = useNotification();

    const handleSuccessNotification = () => {
        notify.success('Operação realizada!', 'A ação foi executada com sucesso.');
    };

    const handleErrorNotification = () => {
        notify.error('Erro na operação', 'Algo deu errado. Tente novamente.');
    };

    const handleWarningNotification = () => {
        notify.warning('Atenção', 'Esta ação não pode ser desfeita.');
    };

    const handleInfoNotification = () => {
        notify.info('Informação', 'Aqui está uma informação importante.');
    };

    const handleCustomNotification = () => {
        notify.custom({
            type: 'success',
            title: 'Notificação personalizada',
            message: 'Esta notificação tem duração customizada',
            duration: 10000, // 10 segundos
        });
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Exemplos de Notificações</h2>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" onClick={handleSuccessNotification}>
                    Sucesso
                </Button>

                <Button variant="danger" onClick={handleErrorNotification}>
                    Erro
                </Button>

                <Button variant="secondary" onClick={handleWarningNotification}>
                    Aviso
                </Button>

                <Button variant="secondary" onClick={handleInfoNotification}>
                    Informação
                </Button>

                <Button variant="primary" onClick={handleCustomNotification}>
                    Personalizada
                </Button>
            </div>
        </div>
    );
};

export default NotificationExamples;