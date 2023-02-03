import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todoWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [languageError, setlanguageError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const [visibleTodos, setVisibleTodos] = useState(todoWithUsers);

  let maxId = Math.max(...todoWithUsers.map(todo => todo.id));

  const createTodo = () => {
    maxId += 1;

    return ({
      id: maxId,
      title,
      completed: false,
      userId: +userId,
      user: getUser(+userId),
    });
  };

  function checkValue(inputValue: string) {
    const reg = /[a-zA-Zа-яА-ЯГЄІЇ\d\s]/g;
    const matches = inputValue.match(reg);

    if (matches === null) {
      setlanguageError(true);
    }

    return matches ? matches.join('') : '';
  }

  type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleField = (e: Event) => {
    const { value } = e.target;

    if (e.target.id === 'title') {
      setTitleError(false);
      setlanguageError(false);

      setTitle(checkValue(value));
    }

    if (e.target.id === 'select') {
      setUserId(value);
      setUserError(false);
    }
  };

  const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      const newTodo = createTodo();

      setVisibleTodos([
        ...visibleTodos,
        newTodo,
      ]);
      setUserId('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        onSubmit={handleNewTodo}
      >
        <div className="field">
          <label>
            Title:
            {' '}
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => handleField(e)}
            />
            {languageError
              && (
                // eslint-disable-next-line max-len
                <span className="error">The title supports only EN and UA letters and numbers</span>
              )}

            {isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={userId}
              id="select"
              onChange={e => handleField(e)}
            >

              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>

              ))}
            </select>

          </label>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
