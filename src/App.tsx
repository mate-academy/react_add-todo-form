import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useState } from 'react';

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
  user: User | undefined;
};

const todosWithUser = todosFromServer.map(t => {
  return {
    ...t,
    user: usersFromServer.find(u => u.id === t.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  function onSubmit(newTodo: Todo) {
    setTodos(current => [...current, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={onSubmit} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
