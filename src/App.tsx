import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [erorTitle, setErorTitle] = useState(false);
  const [erorUser, setErorUser] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (title !== '' && userName !== '') {
            setTodos([...todos, {
              id: todos.length + 1,
              title,
              completed: false,
              userId: Number(
                usersFromServer.find(user => user.name === userName)?.id,
              ),
              user: usersFromServer.find(
                user => user.name === userName,
              ) || null,
            }]);
            setTitle('');
            setUserName('');
          }

          if (title === '') {
            setErorTitle(true);
          }

          if (userName === '') {
            setErorUser(true);
          }
        }}
      >
        <div className="field">
          Title:
          {' '}
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setErorTitle(false);
              setTitle(event.target.value);
            }}
          />
          {erorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          {' '}
          <select
            name="user"
            data-cy="userSelect"
            value={userName}
            onChange={(event => {
              setErorUser(false);
              setUserName(event.target.value);
            })}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>

          {erorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
