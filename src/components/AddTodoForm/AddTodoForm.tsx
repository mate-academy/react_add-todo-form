import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getLargestId } from '../../utils/getLargestId';

type Props = {
  users: User[];
  onAddTodo: (newTodo: Todo) => void;
  getUsersById: (users: User[], userId: number) => User | undefined;
  todos: Todo[];
};

export const AddTodoForm: React.FC<Props> = props => {
  const { users, onAddTodo, getUsersById, todos } = props;

  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(
      event.target.value
        .trimStart()
        .replace(/[^a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9 ]/g, ''),
    );
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setHasTitleError(false);
    setSelectedUserId(0);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserIdError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    if (title && selectedUserId) {
      const newTodo: Todo = {
        id: getLargestId(todos),
        title,
        userId: selectedUserId,
        user: getUsersById(users, selectedUserId),
        completed: false,
      };

      onAddTodo(newTodo);
      handleReset();
    }
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

        {hasTitleError && <span className="error">Please enter a title</span>}
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

        {hasUserIdError && <span className="error">Please choose a user</span>}
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
