import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { CreateForm } from './components/CreateForm';
import { Todo, TodoWithUser } from './types';
import { createNewTodoId, findUserById } from './utils';
import './App.scss';

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(usersFromServer, todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);

  const create = ({ title, userId }: Pick<Todo, 'title' | 'userId'>) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        title,
        userId,
        completed: false,
        id: createNewTodoId(currentTodos),
        user: findUserById(usersFromServer, userId),
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <CreateForm create={create} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
