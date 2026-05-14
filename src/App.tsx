import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { CreateTodoForm } from './components/CreateTodoForm';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const handleAdd = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <CreateTodoForm users={usersFromServer} onAdd={handleAdd} />

      <TodoList todos={todos} />
    </div>
  );
};
