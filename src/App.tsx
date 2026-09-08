import './App.scss';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
 import usersFromServer from './api/users';
 import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [users] = useState<User[]>(usersFromServer);

  const preparedInitialTodos: Todo[] = todosFromServer.map((todo) => ({
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedInitialTodos);

  const handleAddTodo = (title: string, userId: number) => {
    const selectedUser = users.find((user) => user.id === userId) || null;
    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="title">Todo App</h1>
      <TodoForm users={users} onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};