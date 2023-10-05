import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (post: Todo) => void;
  todos: Todo[];
};

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const NewTodo: React.FC<Props> = ({ onSubmit, todos }) => {
  const [title, setTitle] = useState('');
  const [hasTitleErorr, setHasTitleErorr] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleErorr(false);
  };

  const handleTitleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleErorr(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="titleInput">
          <div className="field">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitleErorr && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </label>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              required
              onChange={handleTitleUserId}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
