import PropTypes from 'prop-types';
import TodoModel from './utils/Todo.model';
import { Link } from 'react-router-dom';

// const Todo = ({ todo, selectTodo }) => {
const Todo = ({ todo }) => {

  const { todoDescription, todoDateCreated, todoCompleted, _id } = todo;
  const dateCreated = new Date(todoDateCreated).toUTCString();
  const completedClassName = todoCompleted ? `completed` : ``;
  // const completed = todoCompleted ? `N/A` : <span id="link" onClick={() => selectTodo(todo)}>Edit</span>;
  const completed = todoCompleted ? `N/A` : <Link to={`/edit/${_id}`}>Edit</Link>;

  return (
    <tr>
      <td className={completedClassName}>{todoDescription}</td>
      <td className={completedClassName}>{dateCreated}</td>
      <td>{completed}</td>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.instanceOf(TodoModel),
  // selectTodo: PropTypes.func
};

export default Todo;
