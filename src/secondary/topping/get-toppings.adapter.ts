import { useCallback, useEffect, useState } from 'react';
import { ITopping } from 'src/domain/entities';
import { getToppingsUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useToppingRepositoryService } from './topping-repository.adapter';

export function useGetToppings(): readonly ITopping[] {
    const repository = useToppingRepositoryService();
    const notificationService = useNotificationService();

    const [toppings, setToppings] = useState<readonly ITopping[]>([]);

    useEffect(() => {
        console.log('use effect toppings');

        const fetchData = async (): Promise<void> => {
            // TODO: Instead, we can use DI containers
            const data = await getToppingsUseCase({ repository, notificationService });
            setToppings(data);
        };

        fetchData();
    }, [repository, notificationService]);

    return toppings;
}
