import React, { useState } from 'react';

import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUser } from './utils';
import todosFromServer from './api/todos';

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [updatedTodo, setUpdatedTodo] = useState(todos);

  const addNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
    };

    setUpdatedTodo(prevTodo => [...prevTodo, newTodo]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>
      <TodoForm addTodo={addNewTodo} />
      <TodoList todos={updatedTodo} />
    </div>
  );
};
