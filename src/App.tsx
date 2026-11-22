import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/Users';

const getUserById = (userID: number): User | null =>
  usersFromServer.find(user => user.id === userID) || null;

const stateUsersForStart: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) =>
  Math.max(0, ...todos.map(todo => todo.id)) + 1;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(stateUsersForStart);

  const handleAddTodo = (title: string, userId: number) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: getNewTodoId(currentTodos),
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      },
    ]);
  };

  return (
    <div className="App p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Add todo form
      </h1>

      <TodoForm users={usersFromServer} onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
