import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import { Todo } from './types/types';
import { getUserById } from './helpers/helpers';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <NewTodo onAdd={addTodo} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
