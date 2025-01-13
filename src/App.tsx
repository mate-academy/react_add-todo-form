import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState([...initialTodos]);

  const onSubmit = ({ id, ...todo }: Todo) => {
    const newId = Math.max(...todos.map(t => t.id)) + 1;

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: newId,
        ...todo,
        user: findUserById(todo.userId),
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form users={usersFromServer} onSubmit={onSubmit} />
      <TodoList todos={todos} />
    </div>
  );
};
