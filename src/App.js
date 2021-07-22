import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(({ id }) => id === todo.userId),
}));

function App() {
  return (
    <div className="App">
      <TodoList todos={preparedTodos} users={users} />
    </div>
  );
}

export default App;
