import { useEffect, useState } from 'react';
import { getTodosService, submitTodoService } from './services/todosdata.service';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';
import InfoModal from './Components/utils/InfoModal';

const noDataMessageStart = `Data not available from the server: `;

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState({ message: ``, type: ``, display: false });
  const [selectedId, setSelectedId] = useState(``);

  const getTodos = async () => {
    const returnedData = await getTodosService();
    Array.isArray(returnedData) && setTodos(returnedData);
    if (returnedData instanceof Error) {
      setError({
        message: noDataMessageStart + returnedData.message,
        type: `get`,
        display: true,
      });
      setTodos([]);
    }
  }


  useEffect(() => {
    getTodos();
  }, []);

  const submitTodo = async todo => {
    const returnedData = await submitTodoService(todo);
    if (returnedData instanceof Error) {
      setSelectedId(``);
      return setError({
        message: `There was a problem saving the todo: ${returnedData.message}`,
        type: `post-put`,
        display: true,
      });
    }
    getTodos();
    setSelectedId(``);
  }

  const selectTodo = todo => {
    setSelectedId(todo._id);
  }

  return (
    <>
      {error.display && <InfoModal closeModal={() => setError({ ...error, display: false })} message={error.message}  />}
      <div className="container">
        <Header />
        <div className="container">
          <AllTodos data={{ todos, message: error.message, type: error.type }} selectTodo={selectTodo} />
          <AddEditTodo submitTodo={submitTodo} selectedId={selectedId} todos={todos} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;