import { notification } from 'antd';
import { INotificationService } from '../../domain/ports';

export function useNotificationService(): INotificationService {
    const [api] = notification.useNotification();

    return {
        notify: (message: string, type: 'info' | 'error' = 'info') => {
            api.open({ message, type });
        }
    };
}
