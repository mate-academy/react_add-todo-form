import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { getUserById } from '../../services/User';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, todos }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleuserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const getNewTodoId = (todoList: Todo[]) => {
    const maxId = Math.max(...todoList.map(todo => todo.id));

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
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
          <label>
            {'Title: '}
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
            />
          </label>

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              value={userId}
              onChange={handleuserIdChange}
              data-cy="userSelect"
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map((user: User) => (
                <option value={user.id} key={user.id}>{user.name}</option>
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
