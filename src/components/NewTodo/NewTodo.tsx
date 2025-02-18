import React, { useState } from 'react';
import './NewTodo.scss';
import usersFromServer from '../../api/users';
import { Todo } from '../../types';
import { titlePattern } from '../../RegExps';
import { getUserById } from '../../utils';
import { getNewTodoId } from '../../utils';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const NewTodo: React.FC<Props> = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setHasTitleError(false);

    setUserId(0);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: getNewTodoId(currentTodos),
        title: title.replace(titlePattern, ''),
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:&nbsp;&nbsp;</label>

        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:&nbsp;&nbsp;</label>

        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(currUser => (
            <option key={currUser.id} value={currUser.id}>
              {currUser.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
