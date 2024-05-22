import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import DateCreated from './utils/DateCreated';
import InfoModal from './utils/InfoModal';

const TodoForm = ({submitTodo, todos, selectedId}) => {

    const [todoDescription, setTodoDescription] = useState(``);
    const [todoDateCreated, setTodoDateCreated] = useState(null);
    const [todoCompleted, setTodoCompleted] = useState(false);
    const [error, setError] = useState({ display: false, message: `` });
    
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname.includes(`edit`)) {
            if (selectedId && todos?.find(currentTodo => currentTodo._id == selectedId)) { // == on purpose here - could be a number!
                const { todoDescription, todoDateCreated, todoCompleted } = todos.find(currentTodo => currentTodo._id == selectedId);
                setTodoDescription(todoDescription);
                setTodoDateCreated(todoDateCreated);
                setTodoCompleted(todoCompleted);
            } else {
                setError({
                    display: true,
                    message: `That todo could not be found, you will be returned to the todos list to try again`,
                });
            }
        }
        return () => {
            setTodoDescription(``);
            setTodoDateCreated(null);
            setTodoCompleted(false);
            setError({ display: false, message: `` })
        }
    }, [todos, selectedId]);

    useEffect(() => {
        if (pathname.includes(`edit`)) {
            if ((todos?.length === 0)) {
                setError({
                    display: true,
                    message: `There are no todos loaded, you will be returned to the home page to try a reload`,
                })
            }
        }
    }, [todos]);

    const handleSubmit = event => {
        event.preventDefault();
        submitTodo( todoDescription, todoDateCreated, todoCompleted, selectedId );
        setTodoDescription(``);
        setTodoDateCreated(null);
        setTodoCompleted(false);
    }

    const dateCreatedContent = (
        <>
            {selectedId && `${new Date(todoDateCreated).toLocaleDateString()} @ ${new Date(todoDateCreated).toLocaleTimeString()}`}
            {!selectedId && <DateCreated updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)} />}
        </>
    );

    const errorModalContent = (
        <>
            {error.display && <InfoModal closeModal={() => setError({ ...error, display: false })} message={error.message} />}
            {!error.display && error.message.length > 0 && <Navigate to="/" />}
        </>
    );

    return (
        <>
            {errorModalContent}
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
        </>
    );
};

TodoForm.propTypes = {
    submitTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        todoDescription: PropTypes.string,
        todoDateCreated: PropTypes.string,
        todoCompleted: PropTypes.bool
    })
  ),
  selectedId: PropTypes.string
};

export default TodoForm;