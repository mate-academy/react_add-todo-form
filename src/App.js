import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import NewTodo from './api/NewTodo';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <NewTodo
        todos={todos}
        users={users}
      />
    </div>
  );
}

export default App;
