import './App.scss';
import { useState } from 'react';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [newTodo, setNewTodo] = useState(todosFromServer);
  const handleNewTodo = (todo: Todo) => {
    setNewTodo(prevTodos => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={handleNewTodo} />
      <TodoList todos={newTodo} users={usersFromServer} />
    </div>
  );
};
