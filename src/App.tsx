import './App.scss';
import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { findUserById } from './utils/FindUserById';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

preparedTodos.sort((todo1, todo2) => todo1.id - todo2.id);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  function handleAddTodo(newTodo: Todo) {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <TodoForm todos={todos} onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
