import axios from 'axios';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { act, cleanup, findByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExampleFormOne } from './ExampleFormOne';

jest.mock('axios');

beforeEach(() => {
    axios.get = jest.fn().mockImplementation(async function (url) {
        const urlObj = new URL(url);
        let returnData = ["Group One", "Group Two", "Group Three"]
        if (urlObj.searchParams.get('name') !== null) {
            returnData = returnData.filter(group => group.indexOf(urlObj.searchParams.get('name') as string) !== -1)
        }
        return Promise.resolve({ data: returnData })
    });
});

afterEach(() => {
    cleanup();
})

describe('ExampleFormOne', () => {
    it('should contain the expected fields', () => {
        render(<Provider store={store}><ExampleFormOne /></Provider>)

        screen.getByLabelText('Group');
        screen.getByLabelText('Title');
        screen.getByLabelText('Start Date');
        screen.getByLabelText('End Date');

    });

    describe('Group field', () => {
        it('should make API calls as you type into the field', async () => {
            render(<Provider store={store}><ExampleFormOne /></Provider>);
            expect(axios.get).not.toHaveBeenCalled();

            const groupField = screen.getByLabelText('Group');
            await userEvent.click(groupField);

            await userEvent.type(groupField, "G");

            await waitFor(() => expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/api/groups?name=G"));
        });

        it('should display the returned items from the API', async () => {
            render(<Provider store={store}><ExampleFormOne /></Provider>);
            expect(axios.get).not.toHaveBeenCalled();

            const groupField = screen.getByLabelText('Group');
            await userEvent.click(groupField);

            await userEvent.keyboard("G");

            screen.getByText("Group One")
            screen.getByText("Group Two")
            screen.getByText("Group Three")
        });

        it('clicking an option should select that value for the field', async () => {
            render(<Provider store={store}><ExampleFormOne /></Provider>);
            expect(axios.get).not.toHaveBeenCalled();

            const groupField = screen.getByLabelText('Group') as HTMLInputElement;
            await userEvent.click(groupField);

            await userEvent.keyboard("G");

            await userEvent.click(screen.getByText("Group Two"));

            expect(groupField.value).toEqual("Group Two")
        });
    });

    describe('Name field', () => {
        it('should show an error if the value does not match the proper format', async () => {
            render(<Provider store={store}><ExampleFormOne /></Provider>);
            expect(axios.get).not.toHaveBeenCalled();

            const titleField = screen.getByLabelText('Title') as HTMLInputElement;
            await userEvent.click(titleField);

            await userEvent.keyboard("Test Value");

            screen.getByText("Invalid Format. It should match xxxx-yyyy where x is a letter and y is a number.")
        });

        it('should not show an error if the value does match the proper format', async () => {
            render(<Provider store={store}><ExampleFormOne /></Provider>);
            expect(axios.get).not.toHaveBeenCalled();

            const titleField = screen.getByLabelText('Title') as HTMLInputElement;
            await userEvent.click(titleField);

            await userEvent.keyboard("AAAA-1234");

            expect(screen.queryByText("Invalid Format. It should match xxxx-yyyy where x is a letter and y is a number.")).toBeNull();
        });
    });

    describe('Start Date field', () => {
        it('should ')
    });
})