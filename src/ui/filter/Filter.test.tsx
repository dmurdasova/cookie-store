import React from 'react';
import { render, screen } from '@testing-library/react';
import { ICookieFilter } from 'src/domain/ports';
import { Filter } from './Filter';
import { ITopping } from 'src/domain/entities';

const toppingsMock: ITopping[] = [{ id: 1, name: 'Coconut' }];

const filterMock: ICookieFilter = {
    term: 'Term',
    selectedToppings: [1],
    sortType: 'none',
    sortOrder: 'desc'
};

describe('Renders Filter component', () => {
    let callback: () => void;

    beforeAll(() => {
        global.matchMedia =
            global.matchMedia ||
            function () {
                return {
                    addListener: jest.fn(),
                    removeListener: jest.fn()
                };
            };

        callback = () => {
            return;
        };
    });

    test('with mock values', () => {
        render(<Filter filter={filterMock} toppings={toppingsMock} handleFilterChange={callback} />);

        // const title = screen.getByText(mock.title);
        // const description = screen.getByText(mock.description!);
        // const price = screen.getByText(mock.price / 100);
        // const rating = screen.getByText(mock.rating!);

        // expect(title).toBeInTheDocument();
        // expect(title.textContent?.trim()).toBe(mock.title);

        // expect(description).toBeInTheDocument();
        // expect(description.textContent?.trim()).toBe(mock.description);

        // expect(price).toBeInTheDocument();
        // expect(price.textContent?.trim()).toBe((mock.price / 100).toString());

        // expect(rating).toBeInTheDocument();
        // expect(rating.textContent?.trim()).toBe(mock.rating?.toString());
    });
});
