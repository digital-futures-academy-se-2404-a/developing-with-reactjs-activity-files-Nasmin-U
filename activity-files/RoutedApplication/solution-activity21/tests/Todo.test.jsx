import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Todo from '../src/Components/Todo';
import TodoModel from '../src/Components/utils/Todo.model';

const TodoTestWrapper = ({ children }) => (
  <MemoryRouter>
    <table>
      <tbody>
        {children}
      </tbody>
    </table>
  </MemoryRouter>
)

describe(`Todo test suite`, () => {
  let testTodo;
  let todoDescription;
  let todoDateCreated;

  beforeEach(() => {
    testTodo = new TodoModel(`Test Todo`, `2019-05-04T15:30:00.000Z`, true);
    ({ todoDescription, todoDateCreated } = testTodo);
  });

  describe(`Testing render when todoCompleted is true`, () => {

    beforeEach(() => {
      render(<Todo todo={testTodo} />, { wrapper: TodoTestWrapper });
    });

    test(`it should render 2 tds with className completed`, () => {

      const date = new Date(todoDateCreated).toUTCString();

      const descriptionCell = screen.getByText(todoDescription);
      const createdCell = screen.getByText(date);

      expect(descriptionCell).toHaveClass(`completed`);
      expect(createdCell).toHaveClass(`completed`);
    });

    test(`it should render 'N/A' in the final td of the row`, () => {
      const expectedAction = `N/A`;

      expect(screen.getByText(expectedAction)).toBeInTheDocument();
    });
  });

  describe(`Testing render when todoCompleted is false`, () => {

    beforeEach(() => {
      testTodo.todoCompleted = false;
      render(<Todo todo={testTodo} />, {wrapper: TodoTestWrapper});
    });

    test(`it should render 2 tds with no className`, () => {

      const date = new Date(testTodo.todoDateCreated).toUTCString();

      const descriptionCell = screen.getByText(testTodo.todoDescription);
      const createdCell = screen.getByText(date);

      expect(descriptionCell).not.toHaveClass(`completed`);
      expect(createdCell).not.toHaveClass(`completed`);
    });

    test(`it should render 'Edit' in the final td of the row`, () => {
      const expectedAction = `Edit`;
      expect(screen.getByText(expectedAction)).toBeInTheDocument();
    });
  });

  describe('Edit Todo selection tests', () => {
    
  //   test('should call the selectTodo function when Edit is clicked', async () => {
  //     const selectTodo = vi.fn();
  //     testTodo.todoCompleted = false;

  //     render(<Todo todo={testTodo} selectTodo={selectTodo} />, {wrapper: TodoTestWrapper});

  //     const editLink = screen.getByText(/edit/i);
  //     await userEvent.click(editLink);

  //     expect(selectTodo).toHaveBeenCalledTimes(1);
  //     expect(selectTodo).toHaveBeenCalledWith(testTodo);
  //   });
    test('should have the todo\'s id as part of the href attribute on the edit link', () => {
      testTodo.todoCompleted = false;
      testTodo._id = `testtodoid`;
      render(<Todo todo={testTodo} />, {wrapper: TodoTestWrapper});

      const editLink = screen.getByText(/edit/i);

      expect(editLink).toHaveAttribute(`href`, `/edit/${testTodo._id}`);
    });
  });
});