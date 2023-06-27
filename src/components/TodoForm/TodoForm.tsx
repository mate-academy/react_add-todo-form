import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { getUserById } from '../../utils/getUserById';
import { getTodoId } from '../../utils/getTodoId';
import { TodoWithUser } from '../../react-app-env';

type Props = {
  addNewTodo: (newTodo: TodoWithUser) => void;
};

export const TodoForm: React.FC<Props> = ({ addNewTodo }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(todosFromServer),
      title,
      userId,
      completed: false,
      user: getUserById(userId, usersFromServer),
    };

    if (!hasTitleError && !hasUserError) {
      addNewTodo(newTodo);
    }

    resetForm();
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
