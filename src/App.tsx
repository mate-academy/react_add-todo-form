import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { getUserById } from './services/userService';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoWithUser } from './types/todo';

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const addTodo = (title: string, userId: number) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const todoToSave: TodoWithUser = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodo => [...currentTodo, todoToSave]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
