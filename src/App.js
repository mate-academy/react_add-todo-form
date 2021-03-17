import React from 'react';
import { Form } from './component/Form';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export const App = () => (
  <div className="App">
    <h1>Add todo form</h1>
    <Form todos={todoFromServer} users={users} />
  </div>
);

export default App;
