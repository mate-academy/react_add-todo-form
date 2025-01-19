import './App.scss';
import { TodoList } from './components/TodoList';
import { Todos } from './Types/Todos';
import { User } from './Types/User';
import { AppForm } from './components/AppForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export const maxId = (todos: Todos[]): number => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const addTodo = (newTodo: Todos) => {
    setTodos(prewTodo => [...prewTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AppForm users={usersFromServer} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
