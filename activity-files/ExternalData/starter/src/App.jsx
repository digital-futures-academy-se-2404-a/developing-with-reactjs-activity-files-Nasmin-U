import { useState } from 'react';
import sampleTodos from './sampleTodos.json';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';

function App() {

  const [todos, setTodos] = useState(sampleTodos);
  const submitTodo = todo => {
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