import { Todo, User } from '../../types/types';
import { ChangeEvent, useState } from 'react';

type Props = {
  onSubmit: (todoData: Omit<Todo, 'id' | 'completed' | 'user'>) => void;
  users: User[];
};

export const TodoForm = ({ onSubmit, users }: Props) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectedUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasUserError(false);
  };

  const onReset = () => {
    setHasUserError(false);
    setHasTitleError(false);
    setSelectedUser(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (selectedUser === 0) {
      setHasUserError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    onSubmit({
      title: title.trim(),
      userId: selectedUser,
    });

    onReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          id="titleInput"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="selectField">User: </label>
        <select
          data-cy="userSelect"
          id="selectField"
          value={selectedUser}
          onChange={handleSelectedUser}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
