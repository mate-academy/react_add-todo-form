import './App.scss';
import React, { useMemo } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoItem } from './types/TodoItem';
import { User } from './types/User';

export const App: React.FC = React.memo(() => {
  const todos: TodoItem[] = todosFromServer;
  const users: User[] = usersFromServer;
  const todosWithUsers: TodoItem[] = useMemo(() => {
    return todos.map(todo => {
      const currentUser = users.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: currentUser,
      };
    });
  }, [todos, users]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList todos={todosWithUsers} />
    </div>
  );
});
App.displayName = 'App';
