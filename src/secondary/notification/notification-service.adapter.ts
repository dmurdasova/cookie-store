import { notification } from 'antd';
import { useMemo } from 'react';
import { INotificationService } from '../../domain/ports';

export function useNotificationService(): INotificationService {
    const [api] = notification.useNotification();

    const memoized = useMemo(
        () => ({
            notify: (message: string, type: 'info' | 'error' = 'info') => {
                api.open({ message, type });
            }
        }),
        [api]
    );

    return memoized;
}
