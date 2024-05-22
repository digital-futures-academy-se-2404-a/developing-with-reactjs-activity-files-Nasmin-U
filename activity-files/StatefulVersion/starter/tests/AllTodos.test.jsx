import { render, screen } from '@testing-library/react';
import AllTodos from '../src/Components/AllTodos';
import sampleTodos from '../src/sampleTodos.json';

test(`it should render the correct number of Todo components based on the todo array supplied`, () => {

  const sampleTodosLength = sampleTodos.length;

  render(<AllTodos data={{ todos: sampleTodos }} />);

  // Test relies on all sample todo descriptions containing `sample` and it not appearing in any other text
  // May be better to use a unique string in test data!
  const numberOfRows = screen.getAllByText(/sample/i);

  expect(numberOfRows).toHaveLength(sampleTodosLength);
});