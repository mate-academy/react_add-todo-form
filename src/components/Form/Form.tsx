import React, { useState } from 'react';
import './Form.scss';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserByTodo } from '../services/user';

type Props = {
  onSubmit: (post: Todo) => void;
};

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [hasSelectError, setHasSelectError] = useState<boolean>(false);

  const resetAll = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: 0,
      user: getUserByTodo(userId),
    });

    resetAll();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleAdd}>
      <div className="field">
        <label htmlFor="post-title" className="label">
          <>Title: </>
        </label>
        <input
          id="post-title"
          placeholder="Enter a title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="post-section" className="label">
          <>User: </>
        </label>
        <select
          id="post-section"
          data-cy="userSelect"
          value={userId}
          onChange={handleSectionChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
