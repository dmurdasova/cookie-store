import { notification } from 'antd';
import { useMemo } from 'react';
import { INotificationService } from '../../domain/ports';

export function useNotificationService(): INotificationService {
    const memoized = useMemo(
        () => ({
            notify: (message: string, type: 'info' | 'error' = 'info') => {
                notification.open({ message, type });
            }
        }),
        []
    );

    return memoized;
}
