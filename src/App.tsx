import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { FormPost } from './components/formPost/formPost';
import { ToDo, User } from './types/types';

const getUser = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initiaTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(initiaTodos);

  const highestId = Math.max(...todos.map(todo => todo.id));

  const addPosts = (newToDo: ToDo) => {
    setTodos(prev => [...prev, newToDo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <FormPost
        onSubmit={addPosts}
        users={usersFromServer}
        heighestId={highestId}
      />
      <TodoList todos={todos} />
    </div>
  );
};
