import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Types/Todo';
import { ServerTodo } from './Types/ServerTodo';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const [
    validTodos,
    setValidTodos,
  ] = useState<ServerTodo[]>([...todosFromServer]);

  const todos: Todo[] = validTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm setValidTodos={setValidTodos} validTodos={validTodos} />

      <TodoList todos={todos} />
    </div>
  );
};
