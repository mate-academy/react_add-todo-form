import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const generateNewId = () => {
    return Math.max(...todos.map((t) => t.id), 0) + 1;
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App container">
      <h1>Add todo form</h1>

      <TodoForm
        onAdd={handleAddTodo}
        generateNewId={generateNewId}
      />

      <TodoList todos={todos} />
    </div>
  );
};
