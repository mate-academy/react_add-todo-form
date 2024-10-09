import React, { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './utils/getUserById';

export const App: React.FC = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: getUserById(todo.userId) || null,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const handleAddTodo = (newElementTodo: Todo) => {
    setTodos(curentTodos => [...curentTodos, newElementTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAddTodo={handleAddTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
