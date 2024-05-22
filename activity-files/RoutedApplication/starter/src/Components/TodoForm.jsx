import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DateCreated from './utils/DateCreated';

const TodoForm = ({submitTodo, todos, selectedId}) => {

    const [todoDescription, setTodoDescription] = useState(``);
    const [todoDateCreated, setTodoDateCreated] = useState(null);
    const [todoCompleted, setTodoCompleted] = useState(false);

    useEffect(() => {
        if (selectedId) {
            const todo = todos.find(currentTodo => currentTodo._id === selectedId)
            const { todoDescription, todoDateCreated, todoCompleted } = todo;
            setTodoDescription(todoDescription);
            setTodoDateCreated(todoDateCreated);
            setTodoCompleted(todoCompleted);
        }
    }, [todos, selectedId]);

    const dateCreatedContent =
        <>
            {selectedId && `${new Date(todoDateCreated).toLocaleDateString()} @ ${new Date(todoDateCreated).toLocaleTimeString()}`}
            {!selectedId && <DateCreated updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)} />}
        </>
    

    const handleSubmit = event => {
        event.preventDefault();
        submitTodo( todoDescription, todoDateCreated, todoCompleted, selectedId );
        setTodoDescription(``);
        setTodoDateCreated(null);
        setTodoCompleted(false);
    }

    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="todoDescription">Description:&nbsp;</label>
                <input
                    id="todoDescription"
                    type="text"
                    name="todoDescription"
                    placeholder="Todo description"
                    className="form-control"
                    value={todoDescription}
                    onChange={event => setTodoDescription(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="todoDateCreated">Created on:&nbsp;</label>
                {/* <DateCreated
                    updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)}
                /> */}
                {dateCreatedContent}
            </div>
            { selectedId && (
                    <div className="form-group">
                        <label htmlFor="todoCompleted">Completed:&nbsp;</label>
                        <input
                            id="todoCompleted"
                            type="checkbox"
                            name="todoCompleted"
                            checked={todoCompleted}
                            onChange={event => setTodoCompleted(event.target.checked)}
                        />
                    </div>
                )
            }
            <div className="form-group">
                <input type="submit" value="Submit" className={`btn ${!todoDescription ? `btn-danger` : `btn-primary`}`} disabled={!todoDescription} />
            </div>
        </form>
    );
};

TodoForm.propTypes = {
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

export default TodoForm;