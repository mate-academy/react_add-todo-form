import React, { ChangeEvent, FormEvent, useState } from 'react';
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

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const maxId = Math.max(0, ...todos.map(({ id }) => id));

    if (title.trim() === '' || userId === 0) {
      setTitleError(title === '');
      setUserIdError(userId === 0);

      return;
    }

    const newTodo = {
      id: maxId + 1,
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleError(false);

    setTitle(value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserIdError(false);

    setUserId(+value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
            <input
              id="titleInput"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              data-cy="userSelect"
              id="userSelect"
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

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
