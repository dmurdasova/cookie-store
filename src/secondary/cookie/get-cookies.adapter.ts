import { ICookieFilter } from '../../domain/ports';
import { getCookiesUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './cookie-repository.adapter';

export function useGetCookies() {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    // TODO: Instead, we can use DI containers
    return (filter: ICookieFilter) => getCookiesUseCase(filter, { repository, notificationService });
}
