import React, { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/NewTodo';

import { TodoWithUser } from './types/TodoWithUser';
import { getUserById } from './services/getUserById';
import { Todo } from './types/Todo';

const todosWithUser = todosFromServer.map(todo => ({
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
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      user: getUserById(todo.userId),
      id: getNewTodoId(todos),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
