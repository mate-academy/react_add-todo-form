import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todos, TodoWithUser, User } from './types';

const todosWithUsers = (todos: Todos[], users: User[]): TodoWithUser[] => {
  return todos.map(todo => {
    const match = users.find(user => user.id === todo.userId);

    return {
      ...todo,
      name: match?.name || '',
      username: match?.username || '',
      email: match?.email || '',
    };
  });
};

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('0');
  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosWithUsers(todosFromServer, usersFromServer),
  );

  const handleOnSubmit = (value: React.FormEvent) => {
    value.preventDefault();

    if (!title || selectedUser === '0') {
      setOnSubmit(true);
    } else {
      setOnSubmit(false);

      const user = usersFromServer.find(u => u.id === Number(selectedUser));

      setTodos(prevTodos => {
        const maxId = Math.max(...prevTodos.map(todo => todo.id), 0);
        const newTodo = {
          id: maxId + 1,
          title: title,
          completed: false,
          userId: Number(selectedUser),
          name: user?.name || '',
          username: user?.username || '',
          email: user?.email || '',
        };

        return [...prevTodos, newTodo];
      });
      setTitle('');
      setSelectedUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleOnSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            onChange={event => setTitle(event.target.value)}
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder={'Enter a title'}
          />
          {onSubmit && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={`${user.id}`}>
                {user.name}
              </option>
            ))}
          </select>
          {onSubmit && selectedUser === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
