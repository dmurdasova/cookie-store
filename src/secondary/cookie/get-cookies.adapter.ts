import { useEffect, useState } from 'react';
import { ICookie } from 'src/domain/entities';
import { ICookieFilter } from '../../domain/ports';
import { getCookiesUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './cookie-repository.adapter';

export function useGetCookies(filter: ICookieFilter): readonly ICookie[] {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const [cookies, setCookies] = useState<readonly ICookie[]>([]);

    useEffect(() => {
        console.log('use effect cookies');

        const fetchData = async (): Promise<void> => {
            // TODO: Instead, we can use DI containers
            const data = await getCookiesUseCase(filter, { repository, notificationService });
            setCookies(data);
        };

        fetchData();
    }, [filter, repository, notificationService]);

    return cookies;
}
