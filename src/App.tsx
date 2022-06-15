/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState } from 'react';

import users from './api/users';
import todosList from './api/todos';

import { PreparedTodos } from './types';

import { TodoList } from './components/TodoList';

const preparedTodos = todosList.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(-1);
  const [todos, setTodos] = useState([...preparedTodos]);
  const [completed, setCompleted] = useState(false);
  const [userAlert, setUserAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(false);
  const prepared: PreparedTodos[] = [...todos];

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <br />
      <TodoList prepared={prepared} />
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (user !== -1 && title !== '') {
            const todo = {
              userId: user,
              id: todos.length + 1,
              title,
              completed,
              user: users.find(use => use.id === user) || null,
            };

            setTodos([...todos, todo]);
            setUser(-1);
            setTitle('');
            setUserAlert(false);
            setTitleAlert(false);
            setCompleted(false);
          } else if (user === -1 && title !== '') {
            setUserAlert(true);
          } else if (title === '' && user !== -1) {
            setTitleAlert(true);
          } else if (user === -1 && title === '') {
            setTitleAlert(true);
            setUserAlert(true);
          }
        }}
        className="form"
      >
        <div className="d-inline-block">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Set title"
            className="form-control text-dark"
            onChange={
              (event) => {
                // eslint-disable-next-line no-console
                console.log(title);
                setTitle(event.target.value);
                setTitleAlert(false);
              }
            }
          />
          <br />
          {titleAlert && (
            <div className="d-inline-block border border-danger text-danger w-100">
              Please, set title!
            </div>
          )}
        </div>

        <div className="d-inline-block">
          <select
            value={user}
            onChange={
              (event) => {
                console.log(user);
                setUser(+(event.target.value));
                setUserAlert(false);
              }
            }
            data-cy="userSelect"
            className="form-select mt-3"
            required
          >
            <option value={-1}>Select User</option>
            {users.map(use => (
              <option
                key={use.id}
                value={use.id}
              >
                {use.username}
              </option>
            ))}
          </select>
          <br />
          {userAlert && (
            <div className="d-inline-block border border-danger text-danger w-100">
              Select user!
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary mb-5"
        >
          Submit
        </button>

        <br />

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={
              () => setCompleted(!completed)
            }
          />
          <div className="d-inline-block">Completed</div>
        </label>

      </form>
    </div>
  );
};

export default App;
