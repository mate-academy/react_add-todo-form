import { FormEvent, useState, ChangeEvent } from 'react';
import { Nullable } from '../../domain/Nullable';
import { Todo } from '../../domain/Todo';

import { User } from '../../domain/User';

type AddTodoFormProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
};

export const AddTodoForm = ({ onSubmit, users }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerIdError, setOwnerIdError] = useState<Nullable<string>>(null);

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);
    setOwnerId(0);
    setOwnerIdError(null);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);
    setTitle(event.target.value.trimStart());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerIdError(null);

    const normalizedTitle = title.trim();

    if (!normalizedTitle && ownerId === 0) {
      setTitleError('Please enter a title');
      setOwnerIdError('Please choose a user');

      return;
    }

    if (!normalizedTitle) {
      setTitleError('Please enter a title');

      return;
    }

    if (ownerId === 0) {
      setOwnerIdError('Please choose a user');

      return;
    }

    onSubmit({
      title: normalizedTitle,
      completed: false,
      userId: ownerId,
    });

    handleResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">Assignee:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={ownerId}
          onChange={event => {
            setOwnerIdError(null);
            setOwnerId(+event.target.value);
          }}
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

        {ownerIdError && <span className="error">{ownerIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
