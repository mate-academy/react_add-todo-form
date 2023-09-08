import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todos.types';
import { getUserById } from './helpers/helpers';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todosList: Todo[]) {
  const maxId = Math.max(
    ...todosList.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(visibleTodos),
    };

    setVisibleTodos(currentTodos => [
      ...currentTodos,
      newTodo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm usersList={usersFromServer} onAdd={addNewTodo} />
      <TodoList todos={visibleTodos} />
    </div>
  );
};
