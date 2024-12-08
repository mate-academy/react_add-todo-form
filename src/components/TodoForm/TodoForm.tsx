import React, { useState } from 'react';

import { User } from '../../types';
import { Todo } from '../../types';

import { getLargestId } from '../../utils/getLargestId';

type Props = {
  users: User[];
  todos: Todo[];
  onAddTodo: (newTodo: Todo) => void;
  getUserById: (user: User[], userId: number) => User | undefined;
};

export const TodoForm: React.FC<Props> = props => {
  const { users, onAddTodo, getUserById, todos } = props;

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(
      event.target.value
        .trimStart()
        .replace(/[^a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9 ]/g, ''),
    );
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setHasTitleError(false);
    setSelectedUserId(0);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserIdError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    if (title && selectedUserId) {
      const newTodo: Todo = {
        id: getLargestId(todos),
        title,
        userId: selectedUserId,
        user: getUserById(users, selectedUserId),
        completed: false,
      };

      onAddTodo(newTodo);
      handleReset();
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box wrap"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="post-title" className="label">
          Title:
        </label>
        <div className="control">
          <input
            type="text"
            id="post-title"
            data-cy="titleInput"
            className="input"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user" className="label">
          User
        </label>

        <div className="control">
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              value={selectedUserId}
              onChange={handleUserIdChange}
              required
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
