import React from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';

function getUserByTodo(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => {
  return { ...todo, user: getUserByTodo(todo.userId) };
});

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onAdd={App} />

      <TodoList todos={todos} />
    </div>
  );
};
