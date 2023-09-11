import React, { useState } from 'react';

import { PreparedTodo } from '../../types';
import users from '../../api/users';
import { findUserById, generateNewId } from '../helpers';

type Props = {
  todos: PreparedTodo[],
  onAddTodo: (newTask: PreparedTodo) => void,
};

export const TodoAddForm: React.FC<Props> = ({ todos, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setIsUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setIsTitleError(false);
    setSelectedUserId(0);
    setIsUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    onAddTodo({
      id: generateNewId(todos),
      title,
      completed: false,
      userId: selectedUserId,
      user: findUserById(selectedUserId, users),
    });

    resetForm();
  };

  return (

    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          data-cy="titleInput"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />

        {isTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {isUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
