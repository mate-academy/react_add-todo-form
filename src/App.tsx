import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todos } from './types/Todos';
import { User } from './types/User';

function getUserId(userId: number): User | null {
  return usersFromServer.find(user => userId === user.id) || null;
}

const initialTodo: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

function getNewTodoId(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodo);

  // const addTodo = (todo: Todos) => {
  //   const newTodo = {
  //     ...todo,
  //     id: getNewTodoId(todos),
  //   };

  const addTodo = (title: string, userId: number) => {
    const newTodo = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserId(userId),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} users={usersFromServer} todos={todos} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
