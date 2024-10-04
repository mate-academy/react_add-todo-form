import React, { useState } from 'react';
import users from '../../api/users';
import { getUsersById } from '../../App';
import { Todo } from '../../types/todo';

type Props = {
  addTodo: (newTodo: Todo) => void;
  getLargestId: () => number;
};

export const AddTodoForm: React.FC<Props> = ({ addTodo, getLargestId }) => {
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

    if (selectedUserId === 0) {
      setUserIdError(true);
    }

    if (!title || selectedUserId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: getLargestId() + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUsersById(selectedUserId),
    };

    addTodo(newTodo);

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
              onChange={event => {
                setSelectedUserId(+event.target.value);
                setUserIdError(false);
              }}
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
