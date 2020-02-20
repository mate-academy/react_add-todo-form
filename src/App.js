import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="todo-list">
      <h2 className="todo-list__title">Todo list</h2>
      <img
        className="todo-list__icon"
        src="https://img.icons8.com/dusk/64/000000/pencil.png"
        alt="pencil"
      />
      <TodoList todos={todos} users={users} />
    </div>
  );
}

export default App;
