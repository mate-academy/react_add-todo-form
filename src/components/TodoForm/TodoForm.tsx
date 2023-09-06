import React, { useState } from 'react';
import './TodoForm.scss';
import { PreparedTodo } from '../../types/PreparedTodo';
import { User } from '../../types/User';

import { fakeUser } from '../../utils';

interface Props {
  todos: PreparedTodo[],
  addTodo: (todo: PreparedTodo) => void,
  users: User[],
}

export const TodoForm: React.FC<Props> = (props) => {
  const {
    todos,
    addTodo,
    users,
  } = props;

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [lastTodoId, setLastTodoId] = useState(todos
    .reduce((acc, el) => (el.id > acc ? el.id : acc), 0));

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      setLastTodoId(prevState => prevState + 1);

      addTodo({
        id: lastTodoId + 1,
        title,
        completed: false,
        userId,
        user: users.find(({ id }) => id === userId) ?? fakeUser,
      });

      setTitle('');
      setUserId(0);

      return;
    }

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleInput}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="userId">User: </label>
        <select
          id="userId"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdSelect}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(({ id, name }) => (
            <option
              value={id}
              key={id}
            >
              {name}
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
