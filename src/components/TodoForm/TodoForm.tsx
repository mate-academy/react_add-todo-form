import React, { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  users: User[];
  onAdd: (todo: Todo) => void;
  nextId: number;
}

export const TodoForm: React.FC<Props> = ({ users, onAdd, nextId }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Дозволяємо лише літери (ua/en), цифри та пробіли
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯіІєЄїЇґҐ0-9 ]/g, '');

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = userId === 0;

    if (isTitleEmpty || isUserNotSelected) {
      setTitleError(isTitleEmpty);
      setUserError(isUserNotSelected);

      return;
    }

    const selectedUser = users.find(u => u.id === userId);

    if (selectedUser) {
      const newTodo: Todo = {
        id: nextId,
        title: title.trim(),
        userId,
        completed: false,
        user: selectedUser,
      };

      onAdd(newTodo);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>
        <div className="control">
          <input
            id="todo-title"
            type="text"
            className="input"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
          />
        </div>
        {titleError && <p className="error">Please enter a title</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user">
          User
        </label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="todo-user"
              value={userId}
              onChange={handleUserChange}
              data-cy="userSelect"
            >
              <option value="0">Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {userError && <p className="error">Please choose a user</p>}
      </div>

      <button
        type="submit"
        className="button is-primary"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
