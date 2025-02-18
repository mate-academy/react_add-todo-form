import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function setNewPostId(todosId: Todo[]) {
    const maxId = Math.max(...todosId.map(todo => todo.id));

    return maxId + 1;
  }

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: setNewPostId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <Form addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
