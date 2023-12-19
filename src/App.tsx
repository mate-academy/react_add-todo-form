import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types';
import { getUserById } from './services/user';

import todosFromServer from './api/todos';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(newTodos),
      ...data,
    };

    setNewTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={newTodos} />
    </div>
  );
};
