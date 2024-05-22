import { render, screen } from '@testing-library/react';
import Todo from '../src/Components/Todo';
import TodoModel from '../src/Components/utils/Todo.model';


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
      render(<table><tbody><Todo todo={testTodo} /></tbody></table>)
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
      render(<table><tbody><Todo todo={testTodo} /></tbody></table>);
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
});