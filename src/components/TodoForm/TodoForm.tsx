import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { Todo } from '../../types';
import { getMaxNumberId } from '../../utils/getMaxNumberId';
import { getUserById } from '../../utils/getUserById';

type Props = {
  onAdd: (newElementTodo: Todo) => void;
  todo: Todo[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, todo }) => {
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectedInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setSelectedUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (selectedUserId === 0) {
      setSelectedUserIdError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    const newTodo = {
      id: getMaxNumberId(todo),
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    onAdd(newTodo);
    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="title">
          Title:{' '}
        </label>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          id="title"
          value={title}
          onChange={handleUserInput}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user">
          User:{' '}
        </label>
        <select
          data-cy="userSelect"
          id="user"
          value={selectedUserId}
          onChange={handleSelectedInput}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
