import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getTodosWithUsers } from './services/getTodosWithUsers';
import { getUserById } from './services/getUserById';
import { TodoWithUser, User } from './types';
import { getNextFreeId } from './services/getNextFreeId';

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(
    getTodosWithUsers(todosFromServer, usersFromServer),
  );
  const [title, setTitle] = useState('');
  const [isTitleHasError, setIsTitleHasError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserIdHasError, setIsUserIdHasError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const pattern = /[^a-zA-Z0-9\sА-Яа-яїЇєЄіІґҐ]/g;
    const newTitle = event.target.value.replace(pattern, '');

    setTitle(newTitle);
    setIsTitleHasError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setIsUserIdHasError(false);
  }

  function reset() {
    setTitle('');
    setIsTitleHasError(false);

    setUserId(0);
    setIsUserIdHasError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const isTitleValid = title !== '';
    const isUserChosen = userId !== 0;

    if (!isTitleValid || !isUserChosen) {
      setIsTitleHasError(!isTitleValid);
      setIsUserIdHasError(!isUserChosen);

      return;
    }

    const newTodo = {
      id: getNextFreeId(todos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(usersFromServer, userId) as User,
    };

    setTodos(prev => [...prev, newTodo]);

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {isTitleHasError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            id="user-id"
            data-cy="userSelect"
            defaultValue={0}
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {isUserIdHasError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
