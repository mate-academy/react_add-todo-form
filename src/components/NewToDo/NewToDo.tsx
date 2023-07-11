import React, { useState } from 'react';
import users from '../../api/users';
import { getUserById } from '../../services/user';
import { ToDo } from '../../services/interfaces';
import todosFromServer from '../../api/todos';

interface Props {
  onSubmit: (toDo: ToDo) => void;
}

export const NewToDo: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [maxId, setMaxId] = useState<number>(Math.max(
    ...todosFromServer.map(todo => todo.id),
  ));

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/[^a-zA-Za-яА-Я0-9\s]/g, '');

    setTitle(cleanedValue);
    setHasTitleError(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  }

  function reset() {
    setTitle('');
    setUserId(0);
  }

  function handlerSubmit(event: React.FormEvent) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title,
      id: maxId + 1,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setMaxId(currentId => currentId + 1);
    reset();
  }

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handlerSubmit}
    >
      <div className="field">
        <label htmlFor="title-input">Title: </label>

        <input
          id="title-input"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-select">User: </label>

        <select
          id="user-select"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => {
            return (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            );
          })}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
