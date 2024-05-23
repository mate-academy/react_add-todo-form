import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (newTodo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onSubmit: onFormSubmit }) => {
  const RESET_TODO = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
    },
  };
  const [count, setCount] = useState(0);
  const [newTodo, setNewTodo] = useState<Todo>(RESET_TODO);

  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const notAllowedCharacters = /[^a-zA-Z\u0400-\u04FF0-9 ]/g;

    setHasTitleError(false);
    setNewTodo(prev => ({
      ...prev,
      title: event.target.value.replace(notAllowedCharacters, ''),
    }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserError(false);
    setNewTodo(prev => ({
      ...prev,
      user: getUserById(+event.target.value),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(prev => prev + 1);

    const isTitleError = !newTodo.title;
    const isUserError = newTodo.user?.id === 0;

    setHasTitleError(isTitleError);
    setHasUserError(isUserError);

    if (isTitleError || isUserError) {
      return;
    }

    onFormSubmit(newTodo);
    setNewTodo(RESET_TODO);
  };

  return (
    <form action="/api/todos" method="POST" key={count} onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={newTodo.title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={newTodo.user?.id}
          onChange={handleUserChange}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
