import { useEffect, useState } from 'react';
import sampleTodos from './sampleTodos.json';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';

import generateTodoId from './Components/utils/generateId';

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(sampleTodos);
  }, []);

  const submitTodo = todo => {
    todo = { ...todo, _id: generateTodoId() };
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
  }

  return (
    <div className="container">
      <Header />
      <div className="container">
        <AllTodos data={{ todos }} />
        <AddEditTodo submitTodo={submitTodo} />
      </div>
      <Footer />
    </div>
  );
}

export default App;