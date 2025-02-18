import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types';
import { getUsersById } from './utils/getUserById';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUsersById(usersFromServer, todo.userId) || {
    id: -1,
    name: 'Unknown User',
    username: '',
    email: '',
  },
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAddTodo = (newTodo: Todo): void => {
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        getUserById={getUsersById}
        todos={todos}
        onAddTodo={onAddTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
