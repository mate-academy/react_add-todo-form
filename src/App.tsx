import './App.scss';
import { PostForm } from './components/PostForm/PostForm';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import React, { useState } from 'react';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

