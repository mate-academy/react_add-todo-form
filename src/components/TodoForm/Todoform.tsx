import React from 'react';
import { useState } from 'react';
import { Nullable } from '../../types/nullable-type';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';

export type UserListProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
};

export const TodoForm: React.FC<UserListProps> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [owner, setOwner] = useState<number>(0);
  const [ownerError, setOwnerError] = useState<Nullable<string>>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);

    setTitle(event.target.value.trimStart());
  };

  const handleOwnerIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnerError(null);

    setOwner(+event.target.value);
  };

  const handleReset = () => {
    setTitle('');
    setTitleError(null);
    setOwner(0);
    setOwnerError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (owner === 0) {
      setOwnerError('Please choose a user');
    }

    if (!title.trim() || owner === 0) {
      return;
    }

    onSubmit({
      title: title,
      completed: false,
      userId: owner,
    });

    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label>
          Title
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </label>
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label>
          User
          <select
            data-cy="userSelect"
            value={owner}
            onChange={handleOwnerIdChange}
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
        </label>

        {ownerError && <span className="error">{ownerError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
