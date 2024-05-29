import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import users from '../../api/users';

type Props = {
  onAdd: (Todo: Todo) => void;
};

export const NewPost: React.FC<Props> = ({ onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [hasTitleArrow, setHasTitleArrow] = useState(false);
  const [hasSelectArrow, setHasSelectArrow] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleArrow(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectArrow(false);
  };

  const recet = () => {
    setTitle('');
    setUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleArrow(!title);
    setHasSelectArrow(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: hasTitleArrow,
      userId,
    });
    recet();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
      <div className="field">
        <label htmlFor="input"> Title </label>
        <input
          type="text"
          id="input"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {hasTitleArrow && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select"> User </label>
        <select
          id="select"
          data-cy="userSelect"
          value={userId}
          onChange={handleSelectChange}
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

        {hasSelectArrow && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
