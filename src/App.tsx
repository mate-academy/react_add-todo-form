import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo, User } from './components/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const handleAddTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todoIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds);

    const preparedTodo = {
      ...newTodo,
      id: maxTodoId + 1,
    };

    setTodos((prevState) => [...prevState, preparedTodo]);
  };

  return (
    <div className="App">
      <h1>Add good form</h1>

      <AddTodoForm onAddTodo={handleAddTodo} getUserById={getUserById} />
      <TodoList todos={todos} />
    </div>
  );
};
