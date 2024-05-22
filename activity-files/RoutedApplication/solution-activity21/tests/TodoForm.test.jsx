import { render, screen } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import TodoForm from '../src/Components/TodoForm';

import sampleTodos from '../src/sampleTodos.json';

describe(`TodoForm test suite`, () => {

    const mockSubmitTodo = vi.fn();

    describe(`Todo form render tests`, () => {

        beforeEach(() => {
            render(<TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });
        });

        test(`it should render a Description input and label`, () => {
            expect(screen.getByPlaceholderText(/todo description/i)).toBeInTheDocument();
        });

        test(`it should render a Completed input and label`, () => {
            expect(screen.queryByRole(`checkbox`)).not.toBeInTheDocument();
        });

        test(`it should render a DateCreated component a date`, () => {

            expect(screen.getByTestId(`dateCreated`)).toBeInTheDocument();
        });

        test(`it should render a Submit button`, () => {
            expect(screen.getByText(`Submit`)).toBeInTheDocument();
        });
    });

    describe(`Form manipulation tests`, () => {

        beforeEach(() => {
            render(<TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });
        });

        test(`it should render the new value in the input when the todoDescription is updated`, async () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);

            expect(descInput).toHaveValue(``);

            await userEvent.type(descInput, testDesc);

            expect(descInput).toHaveValue(testDesc);
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

            render(<TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} />, { wrapper: MemoryRouter });
            const descInput = screen.getByPlaceholderText(/todo description/i);
            const submitBtn = screen.getByDisplayValue(/submit/i);

            await userEvent.type(descInput, testDesc);
            await userEvent.click(submitBtn);

            expect(mockSubmitTodo).toHaveBeenCalledTimes(1);
            expect(mockSubmitTodo).toHaveBeenCalledWith(testDesc, expect.any(Date), false, undefined);
        });
    });

    describe('Form edit tests', () => {

        describe('Normal tests', () => {

            beforeEach(() => {
                render(
                    <MemoryRouter initialEntries={[`/edit/${sampleTodos[2]._id}`]}>
                        <TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} selectedId={sampleTodos[2]._id} />
                    </MemoryRouter>
                );
            });
       
            test('should render the values for the todo in the form if a selectedId is supplied', () => {

                const description = screen.getByDisplayValue(sampleTodos[2].todoDescription);

                expect(description).toBeInTheDocument();
            });

            test('should display the date the todo was created', () => {

                const dateCreated = `${new Date(sampleTodos[2].todoDateCreated).toLocaleDateString()} @ ${new Date(sampleTodos[2].todoDateCreated).toLocaleTimeString()}`

                expect(screen.getByText(dateCreated)).toBeInTheDocument();
            
            });

            test('should display the checkbox for completing', () => {
           
                expect(screen.queryByRole(`checkbox`)).toBeInTheDocument();
            });

            test(`it should render the new value in the checkbox when the todoCompleted onChange function is activated`, async () => {

                const completedCkbx = screen.getByRole(`checkbox`);
                expect(completedCkbx).not.toBeChecked();

                await userEvent.click(completedCkbx);

                expect(completedCkbx).toBeChecked();

            });
        });
    });

    describe('Error condition tests', () => {

        test('should display an error modal if the no todos are supplied', async () => {

            render(
                <MemoryRouter initialEntries={[`/edit`]}>
                    <TodoForm submitTodo={mockSubmitTodo} todos={[]} />
                </MemoryRouter>
            );

            const modalMessage = await screen.getByText(`There are no todos loaded, you will be returned to the home page to try a reload`);
            
            expect(modalMessage).toBeInTheDocument();
        });

        test('should display an error modal if the todo with the supplied id cannot be found', async () => {
            
            render(
                <MemoryRouter initialEntries={[`/edit/selectedIdNotAnId`]}>
                    <TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} />
                </MemoryRouter>
            );

            const modalMessage = screen.getByText(`That todo could not be found, you will be returned to the todos list to try again`);
            expect(modalMessage).toBeInTheDocument();
        });

        test('should close the error modal and navigate to `/` when close is clicked', async () => {

            const routes = [
                {
                    path: `/edit/selectedIdNotAnIdAgain`,
                    element: <TodoForm submitTodo={mockSubmitTodo} todos={sampleTodos} />
                },
                {
                    path: `/`,
                    element: <div>Redirected home</div>
                }
            ];

            const router = createMemoryRouter(routes, {
                initialEntries: [`/edit/selectedIdNotAnIdAgain`],
                initialIndex: 0,
            });

            render(<RouterProvider router={router} />);


            const modalCloseBtn = screen.getByText(/close/i);
            await userEvent.click(modalCloseBtn);

            expect(screen.getByText(`Redirected home`)).toBeInTheDocument();
        });
    });
});