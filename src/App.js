import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/todolist/Todolist';

import { getPreparedTodos } from './Components/getPreparedTodos';

const preparedList = getPreparedTodos(todos, users);

const App = () => (
  <div className="App">
    <TodoList preparedTodos={preparedList} users={users} />
  </div>
);

export default App;
