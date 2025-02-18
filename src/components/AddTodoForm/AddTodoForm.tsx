import React, { useState } from 'react';
import users from '../../api/users';
import { getUsersById } from '../../utils/getUserById';
import { Todo } from '../../types';
import { getLargestId } from '../../utils/getLargestId';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const AddTodoForm: React.FC<Props> = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(
      event.target.value
        .trimStart()
        .replace(/[^a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9 ]/g, ''),
    );
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setTitleError(false);
    setSelectedUserId(0);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserIdError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: getLargestId(currentTodos),
        title,
        completed: false,
        userId: selectedUserId,
        user: getUsersById(selectedUserId),
      },
    ]);

    handleReset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box wrap"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            className="input"
            placeholder="enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user" className="label">
          User
        </label>

        <div className="control">
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              value={selectedUserId}
              onChange={handleUserIdChange}
              required
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {userIdError && <span className="error">Please choose a user</span>}
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
      </div>
    </form>
  );
};
