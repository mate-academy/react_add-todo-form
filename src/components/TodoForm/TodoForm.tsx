/* eslint-disable @typescript-eslint/quotes */
import React, { useState } from "react";
import { Todo } from "../../types/Todo";
import usersFromServer from "../../api/users";
import { findUserById } from "../../services/User";

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle("");
    setHasTitleError(false);
    setUserId(0);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !title.trim()) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: 0,
      user: findUserById(userId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label htmlFor="todo-title">Title:</label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user">User:</label>

        <select
          id="todo-user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map((user) => (
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
