import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number | null;
  user: User | null;
};

type Props = {
  onSubmit: (newAdd: ToDo) => void;
  users: User[];
  highestId: number;
};

export const FormPost: React.FC<Props> = ({ onSubmit, users, highestId }) => {
  const [value, setValue] = useState<string>('');
  const [touch, setTouch] = useState<boolean>(false);
  const [touchSelect, setTouchSelect] = useState<boolean>(false);
  const [select, setSelect] = useState<string>('');
  const reset = (): void => {
    setValue('');
    setSelect('');
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.currentTarget.value);
    setTouchSelect(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (e.currentTarget.value) {
      setTouch(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouch(!value);
    setTouchSelect(!select);

    if (select && value) {
      const foundUser: User | null =
        users.find(user => user.name === select) || null;

      onSubmit({
        id: highestId + 1,
        title: value,
        completed: false,
        userId: foundUser && foundUser.id,
        user: foundUser,
      });

      reset();
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={event => handleSubmit(event)}
    >
      <div className="field">
        <label htmlFor="input">Title:</label>
        <input
          type="text"
          data-cy="titleInput"
          id="input"
          value={value}
          onChange={event => handleChangeInput(event)}
          placeholder="Enter todo"
        />

        {touch && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select">User:</label>
        <select
          data-cy="userSelect"
          id="select"
          value={select}
          onChange={event => handleChangeSelect(event)}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(user => {
            return (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        {touchSelect && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
