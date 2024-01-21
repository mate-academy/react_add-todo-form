import { useState } from 'react';
import { Todo } from '../../types/Todo';

import usersFromServer from '../../api/users';
import { getNewTodoId } from '../../functions/helper';
import todos from '../../api/todos';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [completed, setCompleted] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setCompleted(false);
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setCompleted(true);

    onAdd({
      id: getNewTodoId(todos),
      title,
      completed,
      userId,
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title.trim()}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <label htmlFor="user">
          User:
        </label>
        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          required
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user </span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
