import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { getUserById } from './services/user';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';

export const preparedTodos: Todo[] = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(preparedTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm setNewTodos={setNewTodos} newTodos={newTodos} />
      <TodoList
        todos={newTodos}
      />
    </div>
  );
};
