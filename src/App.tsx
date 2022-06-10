import React, { useState } from 'react';
import './App.scss';
import { FullTodo } from './react-app-env';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState('0');
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todo, setTodo] = useState(todos);

  const addTodo = () => {
    const currentUser = users.find(usero => usero.name === user);

    const validateTitle = query.replace(/[^A-Za-z0-9А-Яа-я ]/ig, '');

    if (!query.length) {
      setTitleError(true);
    }

    if (user === '0') {
      setUserError(true);
    }

    if (query.length && user.length !== 1) {
      const newTodo = {
        id: todo[todo.length - 1].id + 1,
        title: validateTitle,
        userId: currentUser ? currentUser.id : 0,
        completed: isCompleted,
      };

      setTodo(current => ([
        ...current,
        newTodo,
      ]));

      setQuery('');
      setUser('0');
      setIsCompleted(false);
    }
  };

  const getUserById = (id: number) => (
    users.find(userio => userio.id === id)
  );

  const preparedTodos: FullTodo[] = todo.map(todoo => ({
    ...todoo,
    user: getUserById(todoo.userId) || null,
  }));

  return (
    <div className="App">
      <h1 className="title">Not static list of todos</h1>

      <form
      className="box"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label>

          <input
          className="input"
            type="text"
            value={query}
            placeholder="Insert the title"
            onChange={(event) => {
              setQuery(event.target.value);
              setTitleError(false);
            }}
          />
        </label>
        {titleError && <p className="error">Please enter the title</p>}
        <br />

        <label
          className="container"
        >

          <select
            className="select"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              setUserError(false);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {users.map(person => (
              <option value={person.name} key={person.id}>{person.name}</option>
            ))}
          </select>
          {userError && <p className="error">Please choose a user</p>}
        </label>
        <br />

        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => {
              setIsCompleted(event.target.checked);
            }}
          />
          Completed
        </label>
        <br />

        <button
        className="button is-info"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList fulltodos={preparedTodos} />
    </div>
  );
};

export default App;
