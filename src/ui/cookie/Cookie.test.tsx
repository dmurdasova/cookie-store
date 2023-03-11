/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cookie } from './Cookie';
import { ICookie } from 'src/domain/entities';

const mock: ICookie = {
    id: 1,
    title: 'Testing cookie',
    description: 'Cookie for the data checking',
    price: 100,
    rating: 4.5
};

describe('Renders Cookie component', () => {
    beforeAll(() => {
        global.matchMedia =
            global.matchMedia ||
            function () {
                return {
                    addListener: jest.fn(),
                    removeListener: jest.fn()
                };
            };
    });

    test('with mock values', () => {
        render(<Cookie item={mock} />);
        const title = screen.getByText(mock.title);
        const description = screen.getByText(mock.description!);
        const price = screen.getByText(mock.price / 100);
        const rating = screen.getByText(mock.rating!);

        expect(title).toBeInTheDocument();
        expect(title.textContent?.trim()).toBe(mock.title);

        expect(description).toBeInTheDocument();
        expect(description.textContent?.trim()).toBe(mock.description);

        expect(price).toBeInTheDocument();
        expect(price.textContent?.trim()).toBe((mock.price / 100).toString());

        expect(rating).toBeInTheDocument();
        expect(rating.textContent?.trim()).toBe(mock.rating?.toString());
    });
});
