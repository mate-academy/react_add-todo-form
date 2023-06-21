import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todoList, setTodoList] = useState([...todosFromServer]);
  const [warningTitle, setWarningTitle] = useState(false);
  const [warningUser, setWarningUser] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        // eslint-disable-next-line consistent-return
        onSubmit={(e) => {
          e.preventDefault();

          let status = false;

          if (!userName) {
            status = true;

            setWarningUser(true);
          }

          if (!title) {
            status = true;

            setWarningTitle(true);
          }

          if (status) {
            return;
          }

          const user = [...usersFromServer].find(
            (userItem) => userItem.name === userName,
          );

          if (user) {
            const todo = {
              id: todoList.length,
              title,
              completed: true,
              userId: user.id,
            };

            setWarningUser(false);
            setWarningTitle(false);
            setTodoList((prev) => [...prev, todo]);
            setUserName('');
            setTitle('');
          }
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(() => event.target.value);
                setWarningTitle(false);
              }}
            />
            {warningTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setWarningUser(false);
              }}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option value={`${user.name}`} key={user.id}>
                  {`${user.name}`}
                </option>
              ))}
            </select>
          </label>
          {warningUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todoList} users={usersFromServer} />
    </div>
  );
};
