import { useState } from 'react';
import { User } from '../../api/users';

type AddTodoFormProps = {
  onAddTodo: (title: string, userId: number) => void;
  users: User[];
};

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  onAddTodo,
  users,
}) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!trimmedTitle || !userId) {
      return;
    }

    onAddTodo(trimmedTitle, userId);

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">
          Title:&nbsp;
          <input
            id="title"
            data-cy="titleInput"
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value.trimStart());
              setHasTitleError(false);
            }}
            placeholder="Enter a title"
          />
        </label>
        {hasTitleError && (
          <span className="error" data-cy="titleError">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
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
        </label>
        {hasUserIdError && (
          <span className="error" data-cy="userError">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
