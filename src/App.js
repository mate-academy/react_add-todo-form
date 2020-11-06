import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

const App = () => (
  <div className="App">
    <h1>Add todo form</h1>
    <p>
      <span>Users: </span>
      {users.length}
    </p>
    <TodoList users={users} todos={todos} />
  </div>
);

export default App;
