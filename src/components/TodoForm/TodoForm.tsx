import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { TasksWithTodo } from '../../types/Todo';
import { getUserById } from '../Helper/Helper';

type Props = {
  onSubmit: (todo: Omit<TasksWithTodo, 'id'>) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle);

    if (newTitle) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUser = +event.target.value;

    setCurrentUserId(newUser);

    if (newUser !== 0) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!currentUserId);

    const newTodo: Omit<TasksWithTodo, 'id'> = {
      title,
      userId: currentUserId,
      user: getUserById(currentUserId),
      completed: false,
    };

    if (title && currentUserId) {
      setTitle('');
      setCurrentUserId(0);
      onSubmit(newTodo);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        {'Title: '}
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        {'User: '}
        <select
          value={currentUserId}
          data-cy="userSelect"
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(el => (
            <option
              key={el.id}
              value={el.id}
            >
              {el.name}
            </option>
          ))}
        </select>
        {hasUserError && <span className="error">Please choose a user</span>}
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
