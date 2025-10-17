import { ChangeEvent, FormEvent, useState } from 'react';
import { Nullable } from '../../domain/Nullable';
import { Todo } from '../../domain/Todo';

type AddTodoFormProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  users: { id: number; name: string }[];
};

export const AddTodoForm = ({ onSubmit, users }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerIdError, setOwnerIdError] = useState<Nullable<string>>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);
    setTitle(event.target.value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOwnerIdError(null);
    setOwnerId(+event.target.value);
  };

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);

    setOwnerId(0);
    setOwnerIdError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerIdError(null);

    const normalizedTitle = title.trim();
    let hasError = false;

    if (!normalizedTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (ownerId === 0) {
      setOwnerIdError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
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
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          value={ownerId}
          onChange={handleUserChange}
        >
          <option value={0} disabled>
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
