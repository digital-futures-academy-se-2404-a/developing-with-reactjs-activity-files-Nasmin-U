import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './css/AllTodos.css';

import Todo from './Todo';
import TodoModel from './utils/Todo.model';

const AllTodos = ({ data }) => {
    const [dataStatus, setDataStatus] = useState({
        name: `loading`,
        message: `Data is loading...`
    });

    useEffect(() => {
        const { message, type } = data;
        (type === `get` && message?.length) && setDataStatus({ name: `error`, message }); 
        !message?.length && setDataStatus({ name: `loading`, message: `Data is loading...` });
    }, [data])

    const status = <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>

    const todos = data.todos.map(currentTodo => {
        const todo = new TodoModel(currentTodo.todoDescription, currentTodo.todoDateCreated, currentTodo.todoCompleted, currentTodo._id);
        return <Todo todo={todo} key={todo._id} />
    });

    return (
        <div className="row">
            <h3>Todos List</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{todos.length > 0 ? todos : status}</tbody>
            </table>
        </div>
    );
};

AllTodos.propTypes = {
    data: PropTypes.exact({
        todos: PropTypes.arrayOf(
            PropTypes.exact({
                _id: PropTypes.string,
                todoDescription: PropTypes.string,
                todoDateCreated: PropTypes.string,
                todoCompleted: PropTypes.bool
            })
        ),
        message: PropTypes.string,
        type: PropTypes.string
    })
};

export default AllTodos;

