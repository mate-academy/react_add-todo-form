import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { getUserById } from '../../services/userService.';
import { Todo } from '../../types/Todo';

function getCorrectTitle(title: string): string {
  const reg = /[0-9a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s]/;
  const correctTitle = title.split('').filter(ch => reg.test(ch)).join('');

  return correctTitle;
}

type Props = {
  onSubmit: (todo: Todo) => void
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(getCorrectTitle(event.target.value));
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetform = () => {
    setTitle('');
    setUserId(0);
  };

  const newTodoId = Math.max(...todosFromServer.map((todo) => todo.id)) + 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: newTodoId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    resetform();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="TodoForm"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="todo-title">Title:</label>
        <input
          id="todo-title"
          name="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-userId">User:</label>
        <select
          id="todo-userId"
          name="userName"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
