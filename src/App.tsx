import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getPreparedData } from './helpers/getPreparedData';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedData = getPreparedData(
  todosFromServer,
  usersFromServer,
);

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleQueue, setTitleQueue] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  const handleFormSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();
    setIsSubmited(true);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitleQueue(e.target.value);
  };

  const handleUserSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              value={titleQueue}
              onChange={handleTitleChange}
            />
          </label>
          {(isSubmited && !titleQueue)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              name="username"
              value={selectedUser}
              onChange={handleUserSelect}
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
          </label>

          {(isSubmited && !selectedUser)
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedData} />
    </div>
  );
};
