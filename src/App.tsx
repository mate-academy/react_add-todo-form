import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { TodoProps } from './types/TodoProps';
import { getUserById } from './services/userService';

export const prepareTodos: TodoProps[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(prepareTodos);
  const onAddTodo = (newTodo: TodoProps) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="section">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onAdd={onAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
