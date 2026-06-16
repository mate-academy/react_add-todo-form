import React, { useState } from 'react';
import './NewTodo.scss';
import { User } from '../../types/user';

type Props = {
  users: User[];
  onAdd: (newTodo: { title: string; userId: number }) => void;
};

export const NewTodo: React.FC<Props> = ({ users, onAdd }) => {
  const defaulSelecttLabel = 'Choose a user';

  const [selectedUser, setSelectedUser] = useState<string | number>(
    defaulSelecttLabel,
  );
  const [inputTitle, setInputTitle] = useState<string>('');
  const [count, setCount] = useState(0);
  const [isErrorTitle, setIsErrorTitle] = useState<boolean>(false);
  const [isErrorUser, setIsErrorUser] = useState<boolean>(false);

  const handelFieldsReset = () => {
    setSelectedUser(defaulSelecttLabel);
    setInputTitle('');
    setCount(prevCount => prevCount + 1);
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      title: inputTitle,
      userId: +selectedUser,
    };

    let hasError = false;

    if (!inputTitle) {
      setIsErrorTitle(true);
      hasError = true;
    }

    if (selectedUser === defaulSelecttLabel) {
      setIsErrorUser(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onAdd(newTodo);
    handelFieldsReset();
  };



  return (
    <form key={count} onSubmit={handelSubmit} action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="">
          Title:
          <input
            data-cy="titleInput"
            type="text"
            value={inputTitle}
            onChange={event => {
              setInputTitle(event.target.value);
              setIsErrorTitle(false);
            }}
            placeholder="Enter a title"
          />
        </label>
        {isErrorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="">
          User:
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              setIsErrorUser(false);
            }}
          >
            <option disabled>{defaulSelecttLabel}</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {isErrorUser && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
