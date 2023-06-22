import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todoList, setTodoList] = useState(todosFromServer);
  const [isWarningTitle, setIsWarningTitle] = useState(false);
  const [isWarningUser, setIsWarningUser] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let status = false;

    if (!userName) {
      status = true;

      setIsWarningUser(true);
    }

    if (!title.trim() || !title) {
      status = true;

      setTitle('');
      setIsWarningTitle(true);
    }

    if (status) {
      return;
    }

    const user = [...usersFromServer].find(
      (userItem) => userItem.name === userName,
    );

    if (!user) {
      throw new Error('Submit error, user not defined');
    }

    if (user) {
      const todo = {
        id: todoList.length,
        title,
        completed: true,
        userId: user.id,
      };

      setIsWarningUser(false);
      setIsWarningTitle(false);
      setTodoList((prev) => [...prev, todo]);
      setUserName('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        // eslint-disable-next-line consistent-return
        onSubmit={handleSubmit}
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
                setTitle(event.target.value);
                setIsWarningTitle(false);
              }}
            />
            {isWarningTitle && (
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
                setIsWarningUser(false);
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
          {isWarningUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todoList} users={usersFromServer} />
    </div>
  );
};
