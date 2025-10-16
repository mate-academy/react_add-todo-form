import './App.scss';
import React from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/todos';
import { User } from './api/users';
import { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';

export type TodoWithUser = Todo & { user: User };

const todos: TodoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  if (!user) {
    throw new Error(`User not found for todo with id ${todo.id}`);
  }

  return { ...todo, user };
});

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<TodoWithUser[]>(todos);

  const addNewTodo = (title: string, userId: number) => {
    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const newId =
      newTodos.length > 0 ? Math.max(...newTodos.map(todo => todo.id)) + 1 : 1;

    const newTodo: TodoWithUser = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    setNewTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAddTodo={addNewTodo} users={usersFromServer} />

      <TodoList todos={newTodos} />
    </div>
  );
};
