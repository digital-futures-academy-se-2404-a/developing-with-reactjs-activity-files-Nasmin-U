import PropTypes from 'prop-types';
import TodoModel from './utils/Todo.model';

const Todo = ({ todo }) => {

  const { todoDescription, todoDateCreated, todoCompleted } = todo;
  const dateCreated = new Date(todoDateCreated).toUTCString();
  const completedClassName = todoCompleted ? `completed` : ``;
  const completed = todoCompleted ? `N/A` : <a href="/">Edit</a>;

  return (
    <tr>
      <td className={completedClassName}>{todoDescription}</td>
      <td className={completedClassName}>{dateCreated}</td>
      <td>{completed}</td>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.instanceOf(TodoModel)
};

export default Todo;
