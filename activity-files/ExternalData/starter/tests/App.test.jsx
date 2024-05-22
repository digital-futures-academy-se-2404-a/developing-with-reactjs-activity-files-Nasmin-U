import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

import sampleTodos from '../src/sampleTodos.json';

// describe('App render test', () => {
//   test('App component renders correctly', () => {
//     expect(render(<App />)).toBeTruthy();
//   });
// });

describe(`Submit todo - add test`, () => {
  test(`it calls submitTodo with the todo when submit todo is clicked on TodoForm`, async () => {

    render(<App />);

    const testDesc = `Sample Test description`; // Sample is important as the query looks for it
    const descInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    await userEvent.type(descInput, testDesc);
    await userEvent.click(submitBtn);

    const numberOfTodoRows = screen.getAllByText(/sample/i).length

    expect(numberOfTodoRows).toBe(sampleTodos.length + 1);

  });
});