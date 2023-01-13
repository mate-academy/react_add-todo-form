import React, { FC, useState } from 'react';

import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserbyName(userName: string): User | null {
  return usersFromServer.find(user => (user.name === userName)) || null;
}

export const todoss: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todoss);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setIsUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !selectedUser) {
      setIsTitleError(!title.trim());
      setIsUserError(!selectedUser);

      return;
    }

    const newId = Math.max(...todos.map(todoElement => todoElement.id)) + 1;

    const addedUser = getUserbyName(selectedUser);

    setTodos(prev => ([
      ...prev,
      {
        id: newId,
        title,
        completed: false,
        userId: addedUser ? addedUser.id : null,
        user: addedUser,
      },
    ]));

    setSelectedUser('');
    setTitle('');
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Add todo form</h1>
        <form
          action="/api/users"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <div className="field">
            <label htmlFor="#title">Title:</label>
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {isTitleError
              && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <label htmlFor="#userSelect">User:</label>
            <select
              data-cy="userSelect"
              id="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            {isUserError
              && <span className="error">Please choose a user</span>}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    </div>
  );
};
