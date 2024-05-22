import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEditTodo from '../src/Components/AddEditTodo';
import sampleTodos from '../src/sampleTodos.json';

describe(`Tests for AddEditTodo`, () => {

    const mockSubmitTodo = vi.fn();

    describe('Add todo tests', () => {

        test(`it should render the Add Todo heading when no selectedId`, () => {
            render(<AddEditTodo submitTodo={mockSubmitTodo} />);

            expect(screen.queryByText(/add todo/i)).toBeInTheDocument();
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
            expect(mockSubmitTodo).toHaveBeenCalledWith(expect.objectContaining({
                todoDescription: testDesc
            }));
        });
    });

    describe('Edit todo tests', () => {
       
        test('should display Edit Todo in the title if a selectedId is given via props', () => {

            render(<AddEditTodo selectedId={sampleTodos[2]._id} submitTodo={mockSubmitTodo} todos={sampleTodos} />);

            expect(screen.getByText(/edit todo/i)).toBeInTheDocument();
        });
        
    });
});
