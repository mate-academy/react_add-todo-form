/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import NewTodo from './Components/NewTodo/NewTodo';
import './App.css';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="App">
      <h1 className="App__heading">
        todos
      </h1>

      <NewTodo users={users} todos={todos} />

    </div>
  );
}

export default App;
