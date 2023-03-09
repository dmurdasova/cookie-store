import { getToppingsUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useToppingRepositoryService } from './topping-repository.adapter';

export function useGetToppings() {
    const repository = useToppingRepositoryService();
    const notificationService = useNotificationService();

    // TODO: Instead, we can use DI containers
    return () => getToppingsUseCase({ repository, notificationService });
}
