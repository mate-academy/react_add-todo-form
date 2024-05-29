import { useState } from 'react';
import { Todo } from '../../types';
import { generateId } from '../../services';
import usersFromServer from '../../api/users';

interface Props {
  onAdd: (newTodo: Todo) => void;
}

export const TextField: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [idError, setIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onAdd({
      id: generateId(),
      title,
      userId,
      completed: false,
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:&nbsp;&nbsp;</label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select">User: </label>

        <select
          data-cy="userSelect"
          id="select"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {idError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
