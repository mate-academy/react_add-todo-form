import React, { useState } from 'react';
import { CreateTodoFormProps } from '../../types';

export function CreateTodoForm({ users, onAddTodo }: CreateTodoFormProps) {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) {
      return;
    }

    onAddTodo(title.trim(), Number(selectedUserId));

    setTitle('');
    setSelectedUserId('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter title"
          onChange={event => {
            setTitle(event.target.value);
            setTitleError('');
          }}
        />

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={event => {
            setSelectedUserId(event.target.value);
            setUserError('');
          }}
        >
          <option value="" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
}
