import React, { useState } from 'react';

import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUser } from './utils';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [updatedTodo, setUpdatedTodo] = useState(todos);

  const addNewTodo = (todo: Omit<Todo, 'id'>) => {
    const newId = () => {
      const maxId: number = Math.max(...todosFromServer.map((item) => item.id));

      return maxId + 1;
    };

    const newTodo = {
      ...todo,
      id: newId(),
    };

    setUpdatedTodo(prevTodo => [...prevTodo, newTodo]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>
      <TodoForm addTodo={addNewTodo} users={usersFromServer} />
      <TodoList todos={updatedTodo} />
    </div>
  );
};
