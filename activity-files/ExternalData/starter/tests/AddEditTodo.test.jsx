import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEditTodo from '../src/Components/AddEditTodo';
import TodoModel from '../src/Components/utils/Todo.model';

describe(`Tests for AddEditTodo`, () => {

    const mockSubmitTodo = vi.fn();

    test(`it should render the Add/Edit Todo heading`, () => {
        render(<AddEditTodo submitTodo={mockSubmitTodo} />);

        expect(screen.queryByText(/add\/edit todo/i)).toBeInTheDocument();
    });

    test(`it should render a TodoForm`, () => {
        render(<AddEditTodo submitTodo={mockSubmitTodo} />);
        expect(screen.queryByRole(`form`)).toBeInTheDocument();
    });

    test(`it should call mockSubmitTodo when the form is submitted`, async () => {
        render(<AddEditTodo submitTodo={mockSubmitTodo} />);
        const testDesc = `Test description`;
        const descInput = screen.getByPlaceholderText(/todo description/i);
        const submitBtn = screen.getByDisplayValue(/submit/i);

        await userEvent.type(descInput, testDesc);
        await userEvent.click(submitBtn);

        expect(mockSubmitTodo).toHaveBeenCalledTimes(1);
        expect(mockSubmitTodo).toHaveBeenCalledWith(expect.any(TodoModel));
    });
});
