import React, { useState } from 'react';
import './App.scss';
import { FullTodo } from './react-app-env';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const getUserById = (id: number) => (
  users.find(user => user.id === id)
);

const preparedTodos: FullTodo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState('0');
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [allTodos, setAllTodos] = useState(preparedTodos);
  const [notValidTitle, setNotValidTitle] = useState(false);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentUser = users.find(person => person.name === user) || null;

    if (!query.length) {
      setTitleError(true);
    }

    if (user === '0') {
      setUserError(true);
    }

    if (query.length && user.length !== 1) {
      const newTodo = {
        id: allTodos[allTodos.length - 1].id + 1,
        title: query,
        userId: currentUser ? currentUser.id : 0,
        completed: isCompleted,
        user: currentUser,
      };

      setAllTodos(current => ([
        ...current,
        newTodo,
      ]));

      setQuery('');
      setUser('0');
      setIsCompleted(false);
    }
  };

  const isInputValid = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (/[^A-Za-z0-9А-Яа-я ]/ig.test(value)) {
      setNotValidTitle(true);
    } else {
      setQuery(event.target.value);
      setTitleError(false);
      setNotValidTitle(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Not static list of todos</h1>

      <form
        className="box"
        onSubmit={(event) => {
          addTodo(event);
        }}
      >
        <label>

          <input
            className="input"
            type="text"
            value={query}
            placeholder="Insert the title"
            onChange={(event) => {
              isInputValid(event);
            }}
          />
        </label>
        {titleError && <p className="error">Please enter the title</p>}
        {notValidTitle && <p className="error">Your symbol is not valid</p>}
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

      <TodoList fulltodos={allTodos} />
    </div>
  );
};

export default App;
