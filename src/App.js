import React from 'react';
import './App.css';

import users from './api/users';

import TodoList from './comonents/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodoList />
    </div>
  );
}

export default App;
