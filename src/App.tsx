import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './interfaces/User';
import { Todo } from './interfaces/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [allTodo, setAllTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [isUserIdEmpty, setIsUserIdEmpty] = useState(true);

  const getId = () => {
    const largestId = [...allTodo].sort((prev, current) => (
      current.id - prev.id
    ));

    return largestId[0].id + 1;
  };

  const addTodo = () => {
    if (title.trim() && userId) {
      const newTodo = {
        id: getId(),
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setAllTodo(current => [...current, newTodo]);
      setTitle('');
      setUserId(0);
      setIsTitleEmpty(true);
      setIsUserIdEmpty(true);
    }

    if (!title.trim()) {
      setIsTitleEmpty(false);
    }

    if (!userId) {
      setIsUserIdEmpty(false);
    }
  };

  const isValid = (value: string) => {
    const regEx = /^[a-zA-Z0-9 ]*$/;

    return regEx.test(value.trim());
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValid(event.target.value)) {
      setTitle(event.target.value);
    }

    setIsTitleEmpty(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserIdEmpty(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}

            <input
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>

          {!isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}

            <select
              data-cy="userSelect"
              id="user"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserIdEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={allTodo} />
    </div>
  );
};
