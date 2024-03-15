import { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';

interface Props {
  onAdd: (todo: Todo) => void;
}

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [currentId, setCurrentId] = useState(16);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (userId === 0) {
      setHasUserIdError(true);
    }

    if (!title || userId === 0) {
      return;
    }

    const id = currentId;

    setCurrentId(currentId + 1);

    onAdd({
      title,
      userId,
      id,
      completed: false,
      user: null,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <>
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {`Title: `}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {`User: `}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => setUserId(+event.target.value)}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
