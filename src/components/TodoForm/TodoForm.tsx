import { useState } from 'react';

import usersFromServer from '../../api/users';
import { getUserById } from '../../services/getUser';
import { Todo } from '../TodoInfo';

type Props = {
  addTodo: (user: Todo) => void
};

export const TodoForm = ({ addTodo }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasSelectError, setSelectError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setSelectError(false);
  };

  const hendlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setTitleError(false);
  };

  const hendlerSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.currentTarget.value);
    setSelectError(false);
  };

  const hendlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title.trim());
    setSelectError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    addTodo({
      user: getUserById(userId),
      id: 0,
      title,
      completed: false,
      userId,
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={hendlerSubmit}
    >
      <div className="field">
        <label htmlFor="form-title">
          Title&nbsp;
        </label>
        <input
          type="text"
          id="form-title"
          data-cy="titleInput"
          value={title}
          onChange={hendlerTitleChange}
          placeholder="title"
        />
        {hasTitleError && <span className="error">Please enter a title</span> }
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={hendlerSelectChange}
        >
          <option>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {hasSelectError
        && <span className="error">Please choose a user</span>}
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
