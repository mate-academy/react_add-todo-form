import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

export const App = () => (
  <div className="App">
    <h1 className="app__title">Todo form</h1>
    <TodoList users={users} todos={todos} />
  </div>
);
