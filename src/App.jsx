import React from 'react';

import './App.css';

import todos from './api/todos';
import users from './api/users';

import TodosList from './components/TodosList/TodosList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function App() {
  return (
    <div className="app">
      <h1>List of todos</h1>
      <TodosList todos={preparedTodos} users={users} />
    </div>
  );
}

export default App;
