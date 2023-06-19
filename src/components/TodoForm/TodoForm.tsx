import React, { ChangeEvent, useState } from 'react';
import './TodoForm.scss';
import { User } from '../../types/User';

type Props = {
  addTodo: (title: string, userId: number) => void
  users: User[],
};

export const TodoForm: React.FC<Props> = ({ addTodo, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setIsUserSelected(false);
    }

    if (!title) {
      setHasTitle(false);
    }

    if (title && userId) {
      const preparedTitle = title.replace(/[^а-яА-Яa-zA-Z\d\s]/g, '');

      addTodo(preparedTitle, +userId);
      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasTitle) {
      setHasTitle(true);
    }

    setTitle(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!isUserSelected) {
      setIsUserSelected(true);
    }

    const userIdNumber = +event.target.value;

    setUserId(userIdNumber);
  };

  return (
    <form
      className="TodoForm"
      action="/api/users"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="TodoForm__field field">
        <input
          className="TodoForm__input TodoForm__input--title"
          type="text"
          name="title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {!hasTitle && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="TodoForm__field field">
        <select
          className="TodoForm__input TodoForm__input--user"
          data-cy="userSelect"
          name="user"
          value={userId}
          onChange={handleChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {!isUserSelected && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        className="TodoForm__submit"
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
