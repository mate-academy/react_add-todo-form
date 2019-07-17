import React from 'react';
import './App.css';
import TodoList from './TodoList';

import users from './api/users';

function App() {
  return (
    <div className="App" key={users.name}>
      <h1>Static list of todos</h1>
      <TodoList currentTodos={users} key={users.id} />
    </div>
  );
}

export default App;
