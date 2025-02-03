import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | undefined;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const initialTodos = todosFromServer.map(todo => {
    const user = usersFromServer.find(
      userFromServer => userFromServer.id === todo.userId,
    );

    return { ...todo, user };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const maxId = todos.reduce((acc, todo) => {
    return todo.id > acc ? todo.id : acc;
  }, 0);

  const addTodo = (todo: Todo) => {
    const user = usersFromServer.find(
      userFromServer => userFromServer.id === todo.userId,
    );
    setTodos([...todos, { ...todo, user }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo users={usersFromServer} onAdd={addTodo} maxId={maxId} />
      <TodoList todos={todos} />
    </div>
  );
};
