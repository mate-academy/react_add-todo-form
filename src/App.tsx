import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';
import { NewTodo } from './components/NewTodo/NewTodo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todosState, setTodosState] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: Math.max(...todosState.map(t => t.id), 0) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodosState(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo users={usersFromServer} onAdd={addTodo} />

      <TodoList todos={todosState} />
    </div>
  );
};
