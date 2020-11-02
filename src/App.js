import React from 'react';
import { TodoForm } from './components/TodoForm';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

const App = () => (
  <div className="App">
    <header>
      <h1>Todo List</h1>
    </header>

    <TodoForm todos={preparedTodos} users={users} />
  </div>
);

export default App;
