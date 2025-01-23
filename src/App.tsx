import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './App.types';
import { TodoList } from './components/TodoList';

const todosWithUser: TodoWithUser[] = todosFromServer.map(
  (todo): TodoWithUser => {
    let user = usersFromServer.find(({ id }) => id === todo.userId);

    if (!user) {
      user = usersFromServer[0];
    }

    return {
      ...todo,
      user,
    };
  },
);
const defaultUserId = '0';
const titleAllowedSymbols = /^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ0-9\s]*$/;

const validateTitleSymbols = (title: string): boolean =>
  titleAllowedSymbols.test(title);

const getTitleErrorMessage = (title: string): string | null => {
  if (!title) {
    return 'Please enter a title';
  }

  if (!validateTitleSymbols(title)) {
    return 'Title contains special symbols';
  }

  return null;
};

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([...todosWithUser]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(defaultUserId);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const isSelectedUser = userId !== defaultUserId;

  const clearForm = () => {
    setTitle('');
    setUserId(defaultUserId);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): null | void => {
    event.preventDefault();
    if (!title || !validateTitleSymbols(title)) {
      setHasTitleError(true);
    }

    if (!isSelectedUser) {
      setHasUserError(true);
    }

    if (title && isSelectedUser) {
      const user =
        usersFromServer.find(({ id }) => id === Number(userId)) ||
        usersFromServer[0];
      const newId = Math.max(...todos.map(todo => todo.id)) + 1;

      const newTodo: TodoWithUser = {
        userId: Number(userId),
        id: newId,
        title,
        completed: false,
        user,
      };

      setTodos([...todos, newTodo]);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && (
            <span className="error">{getTitleErrorMessage(title)}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setHasUserError(false);
            }}
          >
            <option value={defaultUserId} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
