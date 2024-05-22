import { render, screen } from '@testing-library/react';
import TodoForm from '../src/Components/TodoForm';

describe(`TodoForm test suite`, () => {

    beforeEach(() => {
        render(<TodoForm />);
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

});