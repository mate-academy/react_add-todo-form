import React from 'react';
import './App.css';

import { getTodosWithUsers } from './api/data';
import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodos from './components/NewTodos/NewTodos';

const preparedTodos = getTodosWithUsers(todos, users);

const App = () => (
  <>
    <h1 className="todos__title">Todos for different users</h1>

    <div className="todo-content">
      <TodoList todos={preparedTodos} />
      <NewTodos />
    </div>
  </>
);

export default App;
