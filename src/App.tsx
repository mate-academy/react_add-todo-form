import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './use_cases/getUserById';
import { useState } from 'react';
import { getMaxTodoId } from './use_cases/getMaxTodoId';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const handleAddNewUser = (title: string, userId: number) => {
    setVisibleTodos(prev => {
      const todo: Todo = {
        id: getMaxTodoId(visibleTodos) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(usersFromServer, userId),
      };

      return [...prev, todo];
    });
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <TodoForm possibleUsers={usersFromServer} onAdd={handleAddNewUser} />
      <TodoList todos={visibleTodos} />
    </div>
  );
};
