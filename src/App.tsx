import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';

import { todosWithUsers } from './utils/getTodoesWithUsers';
import { getRandomId } from './utils/getRandomId';
import { findUserById } from './utils/findUserById';

const DEFAULT_USER_ID = 0;
const EMPTY_TITLE_ERROR = 'Please enter a title';
const EMPTY_USER_ERROR = 'Please choose a user';

export const App = () => {
  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [hasUserIdError, setUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [todos, setTodos] = useState(todosWithUsers);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      userId,
      id: getRandomId({ todos }),
      title,
      completed: false,
      user: findUserById(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(DEFAULT_USER_ID);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {hasTitleError && <span className="error">{EMPTY_TITLE_ERROR}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value={DEFAULT_USER_ID} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && <span className="error">{EMPTY_USER_ERROR}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
