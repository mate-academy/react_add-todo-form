import './App.scss';
import { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('0');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(true);
  const [userError, setUserError] = useState(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedUser === '0') {
      setUserError(false);
    }

    if (!title) {
      setTitleError(false);
    }

    const copyTitle = title.slice().split('');

    // eslint-disable-next-line max-len
    const validation = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789йцукенгґшщзхїфівапролджєячсмитьбюЙЦУКЕНГҐШЩЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ';

    if (copyTitle.length !== copyTitle
      .filter((letter: string) => validation.includes(letter)).length) {
      return null;
    }

    const user = usersFromServer
      .find(userFromServer => userFromServer.name === selectedUser);

    if (user !== undefined) {
      todosFromServer.push({
        id: todosFromServer
          .sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
        title,
        completed: false,
        userId: user.id,
      });

      setSelectedUser('0');
      setTitle('');
    }

    return todosFromServer;
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
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(e) => {
                setTitle(e.currentTarget.value);
                setTitleError(true);
              }}
            />
          </label>

          <span
            className="error"
            hidden={titleError}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          {'User: '}
          <select
            value={selectedUser}
            data-cy="userSelect"
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setUserError(true);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.name}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          <span
            className="error"
            hidden={userError}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosFromServer} users={usersFromServer} />
    </div>
  );
};
