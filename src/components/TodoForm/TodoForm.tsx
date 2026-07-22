import React, { useState } from 'react';

type TodoFormProps = {
  users: { id: number; name: string; username: string; email: string }[];
  onAdd: (todo: { title: string; userId: number }) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({ users, onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    sethasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    sethasTitleError(!title);
    sethasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      title,
      userId,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="field" htmlFor="todo-title">
          Title:&nbsp;&nbsp;
          <input
            id="todo-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;&nbsp;</label>

        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
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

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
