import React, { useState } from 'react';
import './App.scss';

import type { User } from './types/User';
import type { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(todos: Todo[]) {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAdd = (title: string, userId: number) => {
    setTodos((currentTodos: Todo[]) => {
      const id = getNewTodoId(currentTodos);
      const newTodo = {
        id,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      return [...currentTodos, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAdd={onAdd} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
