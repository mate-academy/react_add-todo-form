import './TodoForm.scss';
import React, { FormEvent, useState } from 'react';

import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (newTodo: Todo) => void,
  todos: Todo[],
};

function generateId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

const validateTitle = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\u0400-\u04FF\s]/g, '');
};

export const TodoForm: React.FC<Props> = ({ onAdd, todos }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const isValid = !titleError && !userIdError;

  function resetForm() {
    setTitle('');
    setUserId(0);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (title.trim().length < 1) {
      setTitleError('Please enter a title');
    }

    if (userId === 0) {
      setUserIdError('Please choose a user');
    }

    if (title.trim().length < 1 || userId === 0) {
      return;
    }

    onAdd({
      id: generateId(todos),
      title,
      userId,
      completed,
    });
    resetForm();
  }

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          Title:
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            value={title}
            onChange={(event) => {
              const validTitle = validateTitle(event.target.value);

              setTitle(validTitle);
              setTitleError('');
            }}
          />
        </label>

        {titleError && (
          <span className="error">{titleError}</span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          {' '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserIdError('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userIdError && (
          <span className="error">{userIdError}</span>
        )}
      </div>

      <div className="field">
        <label>
          Completed:
          {' '}
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </label>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        disabled={!isValid}
      >
        Add
      </button>
    </form>
  );
};
