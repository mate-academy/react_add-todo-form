import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const defaultTitle = '';
  const defaultUserId = '';

  const [title, setTitle] = useState(defaultTitle);
  const [userId, setUserId] = useState(defaultUserId);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todosWithUsers);

  let maxId = Math.max(...todosWithUsers.map(todo => todo.id));

  const createNewTodo = () => {
    maxId += 1;

    return ({
      id: maxId,
      title,
      completed: false,
      userId: Number(userId),
      user: getUserById(Number(userId)),
    });
  };

  const handleAddNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      const newTodo = createNewTodo();

      setVisibleTodos([
        ...visibleTodos,
        newTodo,
      ]);

      setTitle(defaultTitle);
      setUserId(defaultUserId);
    }
  };

  return (
    <div className="App">
      <h1 className="title is-2 is-spaced">Add todo form</h1>

      <form onSubmit={handleAddNewTodo} className="App__form">
        <div className="App__field field">
          <label>
            Title:

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              className="input is-warning is-rounded is-normal"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
            {isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="App__field field">
          <label htmlFor="userSelect">
            User:
          </label>

          <div className="select is-warning is-rounded">
            <select
              id="userSelect"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(event.target.value);
                setUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-success"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
