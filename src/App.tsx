import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosStart: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(todosStart);
  const [title, setTitle] = useState('');
  const [isUser, setIsUser] = useState(true);
  const [isTitle, setIsTitle] = useState(true);

  const addTodo = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!selectedUser || !title) {
      setIsUser(Boolean(selectedUser));
      setIsTitle(Boolean(title));

      return;
    }

    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: +selectedUser,
        user: getUser(+selectedUser),
      },
    ]);

    setSelectedUser('');
    setTitle('');
  };

  const handleTitle = (value: string) => {
    const match = value.match(/[0-9a-zA-Zа-яА-Я\s]+/u) || '';

    setTitle(match[0]);
    setIsTitle(true);
  };

  const handleUser = (value: string) => {
    setSelectedUser(value);
    setIsUser(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => handleTitle(e.target.value)}
            />
          </label>

          {isTitle || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={e => handleUser(e.target.value)}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isUser || <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
