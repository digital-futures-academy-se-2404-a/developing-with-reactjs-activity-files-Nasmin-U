import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

import sampleTodos from '../src/sampleTodos.json';
import { getTodosService, submitTodoService } from '../src/services/todosdata.service';

vi.mock('../src/services/todosdata.service', () => {
  return {
    getTodosService: vi.fn(),
    submitTodoService: vi.fn()
  }
});

describe('App tests', () => {

  describe('Initial render tests', () => {
    beforeEach(() => {
      getTodosService.mockImplementation(() => new Promise((resolve, reject) => () => { }));
      render(<App />, {wrapper: MemoryRouter});
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    test('should display "Data is loading..." on the initial render', () => {
      const loading = screen.getByText(`Data is loading...`);

      expect(loading).toBeInTheDocument();
    });

    test('should call the getTodosService before component settles', () => {
      expect(getTodosService).toHaveBeenCalled();
    });
  });

  describe('Error return tests', () => {
    const errorReturn = new Error(`Mock GET error`);

    beforeEach(async () => {
      getTodosService.mockImplementation(() => errorReturn);
      render(<App />, {wrapper: MemoryRouter});
      await waitForElementToBeRemoved(() => screen.getByText(`Data is loading...`));
    });

    test('should show the error modal if the network call returns an error', () => {
      const modalTitle = screen.getByText(`Todo App Info`);

      expect(modalTitle).toBeInTheDocument();
    });

    test('should close the error modal when the X is clicked in the modal top bar', async () => { 
      const modalX = screen.getAllByRole(`button`)[0];
      await userEvent.click(modalX);

      expect(screen.queryByText(`Todo App Info`)).not.toBeInTheDocument();

    });

    test('should close the error modal when the X is clicked in the modal top bar', async () => { 
      const modalCloseBtn = screen.getAllByRole(`button`)[1];
      await userEvent.click(modalCloseBtn);

      expect(screen.queryByText(`Todo App Info`)).not.toBeInTheDocument();

    });
  });
  
  describe(`Submit todo - add test`, () => {
    test(`it calls submitTodo with the todo when submit todo is clicked on TodoForm`, async () => {
      getTodosService.mockImplementation(() => sampleTodos );

      render(<App />, {wrapper: MemoryRouter});

      await waitForElementToBeRemoved(() => screen.getByText(`Data is loading...`));

      const addTodoLink = screen.getByText(/add todo/i);
      await userEvent.click(addTodoLink);

      const testDesc = `Sample Test description`; // Sample is important as the query looks for it
      const descInput = screen.getByPlaceholderText(/todo description/i);
      const submitBtn = screen.getByDisplayValue(/submit/i);

      await userEvent.type(descInput, testDesc);
      await userEvent.click(submitBtn);

      expect(submitTodoService).toHaveBeenCalledTimes(1);
      expect(submitTodoService).toHaveBeenCalledWith(expect.objectContaining({
        todoDescription: testDesc,
      }));
    });

    test('should display an error modal if service returns error', async () => {
      
      const testError = new Error(`Test POST error`);
      getTodosService.mockImplementation(() => sampleTodos);
      submitTodoService.mockImplementation(() => testError);
      
      render(<App />, {wrapper: MemoryRouter});

      await waitForElementToBeRemoved(() => screen.getByText(`Data is loading...`));

      const addTodoLink = screen.getByText(/add todo/i);
      await userEvent.click(addTodoLink);

      const testDesc = `Sample Test description`; // Sample is important as the query looks for it
      const descInput = screen.getByPlaceholderText(/todo description/i);
      const submitBtn = screen.getByDisplayValue(/submit/i);

      await userEvent.type(descInput, testDesc);
      await userEvent.click(submitBtn);

      const modalTitle = screen.getByText(`Todo App Info`);

      expect(modalTitle).toBeInTheDocument();
    });
  });

  describe('Select todo for edit tests', () => {
    
    test('should display the selected todo in the form when edit is clicked', async () => {
      
      getTodosService.mockImplementation(() => sampleTodos );

      render(<App />, {wrapper: MemoryRouter});

      await waitForElementToBeRemoved(() => screen.getByText(`Data is loading...`));

      const editLinks = screen.getAllByText(/edit/i);
      await userEvent.click(editLinks[0]);

      const descInput = screen.getByDisplayValue(sampleTodos[2].todoDescription);

      expect(descInput).toBeInTheDocument();
    });
  });
});

