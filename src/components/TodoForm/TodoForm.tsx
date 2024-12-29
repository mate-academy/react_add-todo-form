// #region imports
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';
import usersFromServer from '../../api/users';
// #endregion

type Props = {
  onSubmit: (todo: Todo) => void;
  onReset?: () => void;
  todo?: Todo;
  body: string;
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  todo,
  onReset = () => {},
}) => {
  const titleField = useRef<HTMLInputElement>(null);

  //const [newTitle, setNewtitle] = useState('blablabla');
  //const [isBodyShown, setIsBodyShown] = useState(false);

  useEffect(() => {
    if (titleField.current && todo) {
      titleField.current.focus();
    }
  }, [todo]);
  //[post?.id]

  // #region state
  const [title, setTitle] = useState(todo?.title || '');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(todo?.userId || 0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [body, setBody] = useState(todo?.body || '');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');
  // #endregion
  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyErrorMessage('');
  };

  // #endregion
  // #region reset
  const reset = () => {
    setTitle('');
    setUserId(0);
    setBody('');

    setHasTitleError(false);
    setHasUserIdError(false);
    setBodyErrorMessage('');

    onReset();
  };

  // #endregion
  // #region submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!body) {
      setBodyErrorMessage('Please enter some text');
    } else if (body.length < 5) {
      setBodyErrorMessage('Body should have at least 5 chars');
    }

    if (!title || !userId || body.length < 5) {
      return;
    }

    onSubmit({
      id: todo?.id || 0,
      title,
      userId,
      user: getUserById(userId),
      completed: false,
      body,
    });

    reset();
  };

  // #endregion

  return (
    <form
      action="/api/posts"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title is-4">Create a todo</h2>

      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasTitleError,
          })}
        >
          <input
            id="todo-title"
            ref={titleField}
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => {
              setHasTitleError(!title);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-t"></i>
          </span>

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle has-text-danger"></i>
            </span>
          )}
        </div>

        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user-id">
          Subject
        </label>

        <div className="control has-icons-left">
          <div
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              id="todo-user-id"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0">Select a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

        {hasUserIdError && (
          <p className="help is-danger">Please select a user</p>
        )}
      </div>

      <div className="field">
        <div className="control">
          <textarea
            className={classNames('textarea', {
              'is-danger': bodyErrorMessage,
            })}
            placeholder="At least 5 characters"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>

        {bodyErrorMessage && (
          <p className="help is-danger">{bodyErrorMessage}</p>
        )}
      </div>

      <div className="buttons">
        <button type="submit" data-cy="submitButton" className="button is-link">
          Submit
        </button>

        <button type="reset" className="button is-link is-light">
          Cancel
        </button>
      </div>
    </form>
  );
};
