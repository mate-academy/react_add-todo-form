import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { ToDo } from '../../types/ToDo';

type Props = {
  onAdd: (todo: ToDo) => void;
  getTodoId: () => number;
};

export const NewTodo: React.FC<Props> = ({ onAdd, getTodoId }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (title.trim().length > 0 && userId > 0) {
      const newTodo: ToDo = {
        id: getTodoId(),
        completed: false,
        title,
        userId,
      };

      onAdd(newTodo);
      setUserId(0);
      setTitle('');
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeTitle}
          />
          {formSubmitted && title.length === 0
            && (<span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {formSubmitted && userId === 0
            && (<span className="error">Please choose a user</span>
            )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
