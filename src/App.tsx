import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUserById } from './helpers/helpers';
import { TodoForm } from './components/TodoForm';

const updatedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(updatedTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        todos={todos}
        setTodos={setTodos}
      />
      <TodoList todos={todos} />
    </div>
  );
};
