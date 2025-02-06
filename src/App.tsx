import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types';
import React, { ChangeEvent, useState } from 'react';

export const App = () => {
  const [todoList, setTodoList] = useState<TodoWithUser[]>(() =>
    todosFromServer.map(({ userId, ...rest }) => {
      const user = usersFromServer.find(({ id }) => userId === id);

      return {
        ...rest,
        user,
      };
    }),
  );
  const [titleInput, setTitleInput] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleInputError, setTitleInputError] = useState('');
  const [userSelectError, setSelectedUserError] = useState('');

  const handleUserSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    setSelectedUserId(value);
    setSelectedUserError('');
  };

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitleInput(value);
    setTitleInputError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasRequiredFields = [titleInput, selectedUserId].every(i => !!i);

    if (!titleInput) {
      setTitleInputError('Please enter a title');
    }

    if (!selectedUserId) {
      setSelectedUserError('Please choose a user');
    }

    if (!hasRequiredFields) {
      return;
    }

    const user = usersFromServer.find(({ id }) => id === selectedUserId);
    const maxTodoId = Math.max(...todosFromServer.map(({ id }) => id));
    const data = {
      id: maxTodoId + 1,
      title: titleInput,
      completed: false,
      user,
    };

    setTodoList(prev => [...prev, data]);

    setTitleInput('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter title"
            value={titleInput}
            onChange={handleTitleInput}
            required
          />
          {titleInputError && <span className="error">{titleInputError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUserId}
            onChange={handleUserSelect}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
          {userSelectError && <span className="error">{userSelectError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
