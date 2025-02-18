import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type FormStates = {
  userId: number;
  title: string;
};

type ContainError = {
  fromTitle: boolean;
  fromUser: boolean;
};

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const initialState: FormStates = {
    userId: 0,
    title: '',
  };
  const initialError: ContainError = {
    fromTitle: false,
    fromUser: false,
  };
  const [formStates, setFormStates] = useState(initialState);
  const [containError, setContainError] = useState(initialError);

  const reset = () => {
    setFormStates({
      userId: 0,
      title: '',
    });

    setContainError({
      fromTitle: false,
      fromUser: false,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormStates(prev => ({
      ...prev,
      title: event.target.value,
    }));

    setContainError(prev => ({
      ...prev,
      fromTitle: false,
    }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormStates(prev => ({
      ...prev,
      userId: +event.target.value,
    }));

    setContainError(prev => ({
      ...prev,
      fromUser: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setContainError(prev => ({
      ...prev,
      fromTitle: !formStates.title,
      fromUser: !formStates.userId || formStates.userId === 0,
    }));

    if (!formStates.title || !formStates.userId) {
      return;
    }

    onSubmit({
      id: 0,
      title: formStates.title,
      completed: false,
      userId: formStates.userId,
      user: getUserById(formStates.userId),
    });

    reset();
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
            ['has-icons-right']: containError.fromTitle,
          })}
        >
          <input
            type="text"
            data-cy="titleInput"
            id="todo-title"
            className={classNames('input', {
              ['is-danger']: containError.fromTitle,
            })}
            value={formStates.title}
            placeholder="Add new entry"
            onChange={handleTitleChange}
          />
          {containError.fromTitle && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
        </div>
        {containError.fromTitle && (
          <p className="error">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-user" className="label">
          User:
        </label>
        <div
          className={classNames('select', {
            ['is-danger']: containError.fromUser,
          })}
        >
          <select
            data-cy="userSelect"
            id="todo-user"
            value={formStates.userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {containError.fromUser && (
          <span className="error">Please choose a user</span>
        )}
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
