import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import AddEditTodo from '../src/Components/AddEditTodo';
import sampleTodos from '../src/sampleTodos.json';

describe(`Tests for AddEditTodo`, () => {

    const mockSubmitTodo = vi.fn();

    describe('Add todo tests', () => {

        test(`it should render the Add Todo heading when no selectedId`, () => {
            render(<AddEditTodo submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });

            expect(screen.queryByText(/add todo/i)).toBeInTheDocument();
        });

        test(`it should render a TodoForm`, () => {
            render(<AddEditTodo submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });
            expect(screen.queryByRole(`form`)).toBeInTheDocument();
        });

        test(`it should call mockSubmitTodo when the form is submitted`, async () => {
            render(<AddEditTodo submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });
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

        beforeEach(() => {
            const routes = [
                {
                    path: `/edit/:selectedId`,
                    element: <AddEditTodo submitTodo={mockSubmitTodo} todos={sampleTodos} />
                },
                {
                    path: `/`,
                    element: <></>
                },
            ];

            const router = createMemoryRouter(routes, {
                initialEntries: [`/edit/${sampleTodos[2]._id}`],
                initialIndex: 0
            });

            render(<RouterProvider router={router} />);
        });
       
        test('should display Edit Todo in the title if a selectedId is given via props', () => {
            
            expect(screen.getByText(/edit todo/i)).toBeInTheDocument();
        });

        test(`it should render a TodoForm with values populated`, () => {

            const descInput = screen.getByDisplayValue(sampleTodos[2].todoDescription);
            const completedInput = screen.getByRole(`checkbox`);

            expect(descInput).toBeInTheDocument();
            expect(completedInput.checked).toBe(sampleTodos[2].todoCompleted);
        });

        test(`it should call mockSubmit when the form is submitted`, async () => {

            const testDesc = `Edited description`;
            
            const submittedTodo = { ...sampleTodos[2], todoDescription: testDesc, todoDateCreated: new Date(sampleTodos[2].todoDateCreated).toISOString() };

            const descInput = screen.getByDisplayValue(sampleTodos[2].todoDescription);

            await userEvent.clear(descInput);
            await userEvent.type(descInput, testDesc);

            const submitBtn = await screen.findByRole(`button`);

            await userEvent.click(submitBtn);

            // expect(mockSubmitTodo).toHaveBeenCalled();
            expect(mockSubmitTodo).toHaveBeenCalledWith(submittedTodo);
        });
        
    });
});
