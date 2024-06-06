import { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from '../../api/users';
import { ToDo } from '../../Types/ToDo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (toDo: ToDo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [hasUserError, setHasUserError] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId || userId === 0);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label htmlFor="todo-title" className="label">
          Title:
        </label>
        <div
          className={classNames('control', {
            ['has-icons-right']: hasTitleError,
          })}
        >
          <input
            type="text"
            data-cy="titleInput"
            id="todo-title"
            className={classNames('input', { ['is-danger']: hasTitleError })}
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
        </div>
        {hasTitleError && <p className="error">Please enter a title</p>}
      </div>

      <div className="field">
        <label htmlFor="todo-user" className="label">
          User:
        </label>
        <select
          className={classNames('select', { ['is-danger']: hasUserError })}
          data-cy="userSelect"
          id="todo-user"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-link"
          >
            Add
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" type="reset">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
