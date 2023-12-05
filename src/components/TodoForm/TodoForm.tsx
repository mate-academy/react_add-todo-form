import { useState } from 'react';
import { Todo } from '../../types/todo';

import { User, getUserById } from '../../types/user';

type Props = {
  onSubmit: (todo: Todo) => void;
  todoId: number;
  users: User[];
};

export const PostForm: React.FC<Props> = ({ onSubmit, todoId, users }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    sethasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!(title.trim())) {
      sethasTitleError(true);
    }

    if (!selectedUserId) {
      sethasUserIdError(true);
    }

    if (title.trim().length === 0 || !selectedUserId) {
      return;
    }

    onSubmit({
      id: todoId,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="text-input">Title:&nbsp;</label>
        <input
          type="text"
          id="text-input"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select-list">User:&nbsp;</label>
        <select
          data-cy="userSelect"
          id="select-list"
          value={selectedUserId}
          onChange={handleUserChange}
        >
          <option value="0" disabled defaultValue="0">
            Choose a user
          </option>

          {users.map((user: User) => (
            <option
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" onChange={handleSubmit}>
        Add
      </button>
    </form>
  );
};
