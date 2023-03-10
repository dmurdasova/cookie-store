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
        // Object.defineProperty(window, 'matchMedia', {
        //     value: jest.fn(() => {
        //         return {
        //             matches: true,
        //             addListener: jest.fn(),
        //             removeListener: jest.fn()
        //         };
        //     })
        // });
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
        expect(title).toBeInTheDocument();
        expect(title.textContent?.trim()).toBe(mock.title);
    });
});
