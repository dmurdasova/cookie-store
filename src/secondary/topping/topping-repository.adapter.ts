import { ITopping } from '../../domain/entities';
import { IToppingRepository } from '../../domain/ports';

export function useToppingRepositoryService(): IToppingRepository {
    let cache: readonly ITopping[] | null = null;

    return {
        get: (): Promise<readonly ITopping[]> => {
            if (cache) {
                console.log('from cache');
                return Promise.resolve(cache);
            }

            const mocks: ITopping[] = [
                { id: 1, name: 'Chocolate' },
                { id: 2, name: 'Strawberry' },
                { id: 3, name: 'Coconut' }
            ];

            cache = mocks;

            return Promise.resolve(mocks);
        }
    };
}
