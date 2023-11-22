import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

interface Props {
  onSubmit: (todo: Todo) => void;
  users: User[];
}

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [postTitle, setPostTitle] = useState('');
  const [hasPostTitleError, setHasPostTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPostTitle(e.target.value);
    setHasPostTitleError(false);
  }

  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(+e.target.value);
    setHasSelectError(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setHasPostTitleError(!postTitle.trim());
    setHasSelectError(!selectedUser);

    if (postTitle.trim() && selectedUser) {
      onSubmit({
        id: 0,
        title: postTitle,
        completed: false,
        userId: selectedUser,
      });
      setPostTitle('');
      setSelectedUser(0);
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={postTitle}
          onChange={handleTitleChange}
        />
        {hasPostTitleError
          && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasSelectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
