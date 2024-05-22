import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useParams } from 'react-router-dom';
import './css/AddEditTodo.css';

import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';

const AddEditTodo = ({ submitTodo, todos }) => {
// const AddEditTodo = ({ submitTodo, todos, selectedId }) => {

  const [submitted, setSubmitted] = useState(false);

  const { selectedId } = useParams();
  
  const submitTodoHandler = (todoDescription, todoDateCreated, todoCompleted, _id, ...others) => {
    const todo = new TodoModel(todoDescription, new Date(todoDateCreated).toISOString(), todoCompleted, _id); // Changed as date format not accepted by MongoDB
    submitTodo({ ...todo, ...others });
    setSubmitted(true);
  }

  const title = selectedId ? `Edit` : `Add`;

  return (
    <>
      {submitted && <Navigate to="/" />}
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
    PropTypes.shape({                     // Changed for Spring integration - adds _class to Mongo Object
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      todoDescription: PropTypes.string,
      todoDateCreated: PropTypes.string,
      todoCompleted: PropTypes.bool
    })
  ),
  // selectedId: PropTypes.string
};

export default AddEditTodo;