import React, { useState } from 'react';
import { User } from '../../types';

type Props = {
  possibleUsers: User[];
  onAdd: (title: string, userId: number) => void;
};

export const TodoForm: React.FC<Props> = ({ possibleUsers, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserSelected, setisUserSelected] = useState(true);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidTitle = title.trim().length > 0;
    const isValidUser = userId !== 0;

    setIsTitleValid(isValidTitle);
    setisUserSelected(isValidUser);

    if (!isValidTitle || !isValidUser) {
      return;
    }

    onAdd(title, userId);

    setTitle('');
    setUserId(0);
    setIsTitleValid(true);
    setisUserSelected(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g,
      '',
    );

    setTitle(cleanTitle);
    setIsTitleValid(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setisUserSelected(true);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
      <div className="field">
        <label className="label" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          value={title}
          onChange={handleInputChange}
          placeholder="Please enter title"
        />
        {!isTitleValid && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user">
          User:
        </label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {possibleUsers.map((user: User) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {!isUserSelected && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
