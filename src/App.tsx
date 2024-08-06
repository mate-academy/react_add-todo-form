import React, { useRef, useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import { getTodosWithUsers, getUserById, findNextFreeId } from './sercices';

import { User, TodoWithUser } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [userId, setUserId] = useState<number>(-1);
  const [isUserIdError, setIsUserIdError] = useState(false);

  const todos = useRef<TodoWithUser[]>(
    getTodosWithUsers(todosFromServer, usersFromServer),
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const isTitleValid = title !== '';
    const isUserChosen = userId !== -1;

    if (!isTitleValid || !isUserChosen) {
      setIsTitleError(!isTitleValid);
      setIsUserIdError(!isUserChosen);

      return;
    }

    const todo: TodoWithUser = {
      id: findNextFreeId(todos.current),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(usersFromServer, userId) as User,
    };

    todos.current.push(todo);

    setTitle('');
    setIsTitleError(false);
    setUserId(-1);
    setIsUserIdError(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const pattern = /[^a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9\s]+/g;

    const newTitle = event.target.value.replace(pattern, '');

    setIsTitleError(false);
    setTitle(newTitle);
  }

  function handleUserSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelection = Number(event.target.value);

    if (newSelection === -1) {
      return;
    }

    setIsUserIdError(false);
    setUserId(newSelection);
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
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            defaultValue={-1}
            value={userId}
            onChange={handleUserSelect}
          >
            <option value={-1}>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {isUserIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos.current} />
    </div>
  );
};
