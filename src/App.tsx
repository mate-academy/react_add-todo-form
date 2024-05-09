import { useState } from 'react';
import './App.scss';

import { TodoList, AddToDoForm } from './components';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { ITodo } from './types/Todos.types';

import { getTodosWithUsers } from './helpers';

export const App = () => {
  const visibleTodo = getTodosWithUsers(todosFromServer, usersFromServer);
  const [todos, setTodos] = useState(visibleTodo);

  const setTodo = (todo: ITodo) => {
    setTodos(prev => [...prev, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddToDoForm todos={todos} setTodos={setTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
