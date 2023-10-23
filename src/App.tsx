import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);

  const [hasNameError, setHasNameError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [currentTodoList, setCurrentTodoList] = useState(todosWithUsers);

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentTitle(event.target.value);
    setHasNameError(false);
  }

  function handleUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentUserId(+event.target.value);
    setHasUserError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentTitle) {
      setHasNameError(true);
    }

    if (!currentUserId) {
      setHasUserError(true);
    }

    if (currentTitle && currentUserId) {
      setCurrentTodoList([...currentTodoList, {
        id: (Math.max(...currentTodoList.map(todo => todo.id)) + 1),
        title: currentTitle,
        completed: false,
        userId: currentUserId,
        user: usersFromServer.find(user => user.id === currentUserId),
      }]);

      setCurrentTitle('');
      setCurrentUserId(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label
            htmlFor="title"
          >
            Title:&nbsp;
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={currentTitle}
            onChange={event => handleTitle(event)}
          />
          {hasNameError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="user"
          >
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="user"
            value={currentUserId}
            onChange={event => handleUser(event)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodoList} />
    </div>
  );
};
