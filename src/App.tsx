import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const MY_REGEX = /[^a-z-а-я-0-9-' ']/gi;

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [counter, setCounter] = useState(
    Math.max(...todos.map(({ id }) => id)) + 1,
  );

  const isValidData = () => {
    if (!userId) {
      setErrorUser(true);
    }

    if (!title.trim()) {
      setErrorTitle(true);
    }

    return !!userId && !!title;
  };

  const resetFields = () => {
    setUserId(0);
    setTitle('');
  };

  const addUser = () => {
    setTodos((prevState) => (
      [
        ...prevState,
        {
          id: counter,
          title,
          completed: false,
          userId,
        }]));
  };

  const handleSubmitButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isValidData();
    addUser();
    resetFields();
    setCounter(state => state + 1);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(MY_REGEX, ''));
    setErrorTitle(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              data-cy="titleInput"
              placeholder="Enter a title"
            />
          </label>
          {errorTitle && <span className="error">Please, enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="user"
              data-cy="userSelect"
              value={userId}
              onChange={handleSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>))
              }
            </select>
          </label>
          {errorUser && <span className="error">Please, choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmitButton}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
