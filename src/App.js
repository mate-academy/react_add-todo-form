import React from 'react';
import './App.css';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';

function App() {
  return (
    <div className="app">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
