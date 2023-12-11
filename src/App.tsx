import React, { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import { Todo } from './types/Todo';
import { getUserById } from './services/user';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const maxId = Math.max(...todosFromServer.map(todo => todo.id));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: maxId + 1,
      ...data,
    };

    setTodos(currentTodo => [
      ...currentTodo,
      newTodo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
