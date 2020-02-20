import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="container">
      <h1 className="title is-5">
        Add Todo Form
      </h1>
      <TodoList users={users} todos={todos} />
    </div>
  );
}

export default App;
