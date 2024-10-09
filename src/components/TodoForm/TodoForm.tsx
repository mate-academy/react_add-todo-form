import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { Todo, TypeError } from '../../types';
import { getMaxNumberId } from '../../utils/getMaxNumberId';
import { getUserById } from '../../utils/getUserById';

type Props = {
  onAddTodo: (newElementTodo: Todo) => void;
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ onAddTodo, todos }) => {
  const [titleError, setTitleError] = useState<string>(TypeError.DEFAULT);
  const [title, setTitle] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserIdError, setSelectedUserIdError] = useState<string>(
    TypeError.DEFAULT,
  );

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(TypeError.DEFAULT);
  };

  const handleSelectedInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserIdError(TypeError.DEFAULT);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleError(TypeError.DEFAULT);
    setSelectedUserIdError(TypeError.DEFAULT);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(TypeError.TITLE_ERROR);
    }

    if (!selectedUserId) {
      setSelectedUserIdError(TypeError.USER_ERROR);
    }

    if (!title || !selectedUserId) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxNumberId(todos),
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    onAddTodo(newTodo);
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
        {titleError && <span className="error">{titleError}</span>}
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
          <span className="error">{selectedUserIdError}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
