import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllTodos from '../src/Components/AllTodos';
import sampleTodos from '../src/sampleTodos.json';

describe('AllTodos tests', () => {
  test(`it should render the correct number of Todo components based on the todo array supplied`, () => {

    const sampleTodosLength = sampleTodos.length;

    render(<AllTodos data={{ todos: sampleTodos }} />, { wrapper: MemoryRouter });

    // Test relies on all sample todo descriptions containing `sample` and it not appearing in any other text
    // May be better to use a unique string in test data!
    const numberOfRows = screen.getAllByText(/sample/i);

    expect(numberOfRows).toHaveLength(sampleTodosLength);
  });

  test('should render the error message in a single cell if no todos are supplied and type is get', () => {
   
    render(<AllTodos data={{ todos: [], message: `Test message`, type: `get` }} />);

    const message = screen.getByText(`Test message`);

    expect(message).toBeInTheDocument();
  });

  test('should not render the error message in a single cell if no todos are supplied and type is not get', () => {
   
    render(<AllTodos data={{ todos: [], message: `Test message`, type: `post` }} />); 

    expect(screen.queryByText(`Test message`)).not.toBeInTheDocument();
  });
});
