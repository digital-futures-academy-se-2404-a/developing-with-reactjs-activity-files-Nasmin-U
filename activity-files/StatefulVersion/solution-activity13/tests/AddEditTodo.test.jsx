import { render, screen } from '@testing-library/react';
import AddEditTodo from '../src/Components/AddEditTodo';

describe(`Tests for AddEditTodo`, () => {

    // ? Are these tests really needed?  No conditional rendering or user actions!

    test(`it should render the Add/Edit Todo heading`, () => {
        render(<AddEditTodo />);

        expect(screen.queryByText(/add\/edit todo/i)).toBeInTheDocument();
    });

    test(`it should render a TodoForm`, () => {
        render(<AddEditTodo />);
        expect(screen.queryByRole(`form`)).toBeInTheDocument();
    })
});
