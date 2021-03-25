import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Form } from './components/Form';

const preperadTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const App = () => (
  <div className="App">
    <h1>Add todo form</h1>
    <p>
      <span>Users: </span>
      {users.length}
    </p>
    <Form todoList={preperadTodos} users={users} />
  </div>
);

export default App;
