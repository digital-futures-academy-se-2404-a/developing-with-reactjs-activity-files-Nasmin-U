import PropTypes from 'prop-types';
import './css/AddEditTodo.css';

import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';

const AddEditTodo = ({ submitTodo }) => {
  
  const submitTodoHandler = (todoDescription, todoDateCreated, todoCompleted) => {
    const todo = new TodoModel(todoDescription,  new Date(todoDateCreated).toUTCString(), todoCompleted);
    submitTodo(todo);
  }

  return (
    <>
      <div className="addEditTodo row">
        <h3>Add/Edit Todo</h3>
      </div>
      <TodoForm submitTodo={submitTodoHandler} />
    </>
  );
};

AddEditTodo.propTypes = {
  submitTodo: PropTypes.func.isRequired
};

export default AddEditTodo;