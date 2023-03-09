import { ICookie } from '../../domain/entities';
import { ICookieFilter, ICookieRepository } from '../../domain/ports';

export function useCookieRepositoryService(): ICookieRepository {
    return {
        get: (request: ICookieFilter): Promise<readonly ICookie[]> => {
            const mocks: ICookie[] = [
                {
                    id: 1,
                    title: 'Chocolate cookie',
                    description: 'Crispy cookie with chocolate!',
                    price: 100,
                    rating: 5
                },
                { id: 2, title: 'Strawberry cookie', price: 120, rating: 5 },
                { id: 3, title: 'Coconut cookie', price: 80, rating: 4.2 }
            ];

            return Promise.resolve(mocks);
        }
    };
}
