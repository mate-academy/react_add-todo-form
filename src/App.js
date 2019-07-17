import React from 'react';
import './App.css';
import TodoList from './TodoList';

import users from './api/users';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList currentTodos={users} />
    </div>
  );
}

export default App;
