import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import userFromServer from '../../api/users';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleEror, setHasTitleEror] = useState(false);
  const [hasUserIdEror, setHasUserIdEror] = useState(false);

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleEror(false);
  };

  const handleSetUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdEror(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleEror(false);
    setHasUserIdEror(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleEror(!title);
    setHasUserIdEror(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const formTodo: Todo = {
      id: 0,
      title: title,
      completed: false,
      userId: userId,
    };

    onAdd(formTodo);

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          value={title}
          placeholder="Enter title"
          onChange={handleSetTitle}
        />
        {hasTitleEror && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          onChange={handleSetUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {userFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdEror && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
