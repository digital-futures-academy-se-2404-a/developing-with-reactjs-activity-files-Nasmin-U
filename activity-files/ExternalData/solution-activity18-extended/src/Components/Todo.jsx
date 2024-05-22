import PropTypes from 'prop-types';
import TodoModel from './utils/Todo.model';

const Todo = ({ todo, selectTodo }) => {

  const { todoDescription, todoDateCreated, todoCompleted } = todo;
  const dateCreated = new Date(todoDateCreated).toUTCString();
  const completedClassName = todoCompleted ? `completed` : ``;
  const completed = todoCompleted ? `N/A` : <span id="link" onClick={() => selectTodo(todo)}>Edit</span>;

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
  selectTodo: PropTypes.func
};

export default Todo;
