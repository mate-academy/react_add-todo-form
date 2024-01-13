import React, { useState } from 'react';
import { Users } from '../../types/User';
import { Todo, Todos } from '../../types/Todo';
import { getUserById } from '../../utils/getUserById';
import { generateNewId } from '../../utils/generateNewId';

interface Props {
  users: Users
  onSubmit: (todo: Todo) => void
  todosArr: Todos
}

export const TodoForm: React.FC<Props> = ({
  users,
  onSubmit,
  todosArr,
}) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let processedValue = event.target.value;

    processedValue = processedValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(processedValue);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
      completed: false,
      user: getUserById(userId, users),
      id: generateNewId(todosArr),
    });

    resetForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="">
          Title:&nbsp;

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="">
          User:&nbsp;

          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
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
