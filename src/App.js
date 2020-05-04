import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const preparedTodos = todos.map(item => (
  {
    ...item,
    user: users.find(user => (user.id === item.id)),
  }
));

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo users={users} />
      <TodoList preparedTodos={preparedTodos} />
    </div>
  );
}

export default App;
