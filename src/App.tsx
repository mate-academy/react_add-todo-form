import './App.scss';
import { useState } from 'react';
import type { Todo } from './types';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => {
      const todoUser = usersFromServer.find(
        serverUser => serverUser.id === todo.userId,
      );

      if (!todoUser) {
        throw new Error(`Missing user for todo ${todo.id}`);
      }

      return {
        ...todo,
        user: todoUser,
      };
    }),
  );

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShowTitleError(false);
  };

  const userHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setShowUserError(false);
  };

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const isTitleValid = cleanTitle.length > 0;
    const isUserValid = userId !== '';

    setShowTitleError(!isTitleValid);
    setShowUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      setShowUserError(true);

      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: Math.max(0, ...currentTodos.map(todo => todo.id)) + 1,
        title: cleanTitle,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      },
    ]);

    setTitle('');
    setUserId('');
    setShowTitleError(false);
    setShowUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={formHandler}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={titleHandler}
              id="title"
              name="title"
              placeholder="Enter a title"
            />
          </label>

          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              name="userId"
              value={userId}
              onChange={userHandler}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
