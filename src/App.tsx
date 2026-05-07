import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';
import { Nullable } from './types/Nullable';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (id: User['id']): Nullable<User> =>
  usersFromServer.find(user => user.id === id) || null;

const todos: TodoWithUser[] = todosFromServer.map((todo: Todo) => {
  const user = findUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<TodoWithUser[]>(todos);

  const handleOnAdd = (title: string, userId: User['id']) => {
    const newId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const todoToAdd: TodoWithUser = {
      id: newId,
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setVisibleTodos([...visibleTodos, todoToAdd]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onAdd={handleOnAdd} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};
