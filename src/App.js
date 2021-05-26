import React from 'react';
import { TodoList } from './TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList users={users} todos={preparedTodos} />
    </div>
  );
}

export default App;
