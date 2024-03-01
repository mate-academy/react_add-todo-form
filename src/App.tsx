import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/todo';

import './App.scss';
import 'bulma/css/bulma.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId) || null;

const InitialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(InitialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={addTodo} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
