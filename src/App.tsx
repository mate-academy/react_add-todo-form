import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// Define types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <TodoForm onAddTodo={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
