import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../src/Components/TodoForm';

describe(`TodoForm test suite`, () => {

    const mockSubmitTodo = vi.fn();

    beforeEach(() => {
        render(<TodoForm submitTodo={mockSubmitTodo} />);
    });

    describe(`Todo form render tests`, () => {

        test(`it should render a Description input and label`, () => {
            expect(screen.getByPlaceholderText(/todo description/i)).toBeInTheDocument();
        });

        test(`it should render a Completed input and label`, () => {
            expect(screen.getByRole(`checkbox`)).toBeInTheDocument();
        });

        test(`it should render a DateCreated component a date`, () => {

            expect(screen.getByTestId(`dateCreated`)).toBeInTheDocument();
        });

        test(`it should render a Submit button`, () => {
            expect(screen.getByText(`Submit`)).toBeInTheDocument();
        });
    });

    describe(`Form manipulation tests`, () => {

        test(`it should render the new value in the input when the todoDescription is updated`, async () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);

            expect(descInput).toHaveValue(``);

            await userEvent.type(descInput, testDesc);

            expect(descInput).toHaveValue(testDesc);
        });

        test(`it should render the new value in the checkbox when the todoCompleted onChange function is activated`, async () => {

            const completedCkbx = screen.getByRole(`checkbox`);
            expect(completedCkbx).not.toBeChecked();

            await userEvent.click(completedCkbx);

            expect(completedCkbx).toBeChecked();

        });

        test(`should enable the submit button when the todo description is populated`, async () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);
            const submitBtn = screen.getByDisplayValue(/submit/i);

            expect(submitBtn).toBeDisabled();

            await userEvent.type(descInput, testDesc);

            expect(submitBtn).not.toBeDisabled();
        });
    });

    describe(`Form submission tests`, () => {

        test(`test the submitTodo prop function is called when submit button is clicked`, async () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);
            const submitBtn = screen.getByDisplayValue(/submit/i);

            await userEvent.type(descInput, testDesc);
            await userEvent.click(submitBtn);

            expect(mockSubmitTodo).toHaveBeenCalledTimes(1);
            expect(mockSubmitTodo).toHaveBeenCalledWith(testDesc, expect.any(Date), false, undefined)
        });
    });
});