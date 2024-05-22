import PropTypes from 'prop-types';
import './css/AddEditTodo.css';

import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';

const AddEditTodo = ({ submitTodo, todos, selectedId }) => {
  
  const submitTodoHandler = (todoDescription, todoDateCreated, todoCompleted, _id) => {
    const todo = new TodoModel(todoDescription, new Date(todoDateCreated).toUTCString(), todoCompleted, _id);
    submitTodo(todo);
  }

  const title = selectedId ? `Edit` : `Add`;

  return (
    <>
      <div className="addEditTodo row">
        <h3>{title} Todo</h3>
      </div>
      <TodoForm submitTodo={submitTodoHandler} todos={todos} selectedId={selectedId} />
    </>
  );
};

AddEditTodo.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      todoDescription: PropTypes.string,
      todoDateCreated: PropTypes.string,
      todoCompleted: PropTypes.bool
    })
  ),
  selectedId: PropTypes.string
};

export default AddEditTodo;