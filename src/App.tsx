import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addTodo = (title: string, userId: number) => {
    const lastTodoId = Math.max(...visibleTodos.map(todo => todo.id));
    const newTodo = {
      id: lastTodoId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setVisibleTodos(state => [...state, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodo={addTodo} users={usersFromServer} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};
