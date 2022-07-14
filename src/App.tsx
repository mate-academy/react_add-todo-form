import React, { useState, SyntheticEvent } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map((todo) => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

const App: React.FC = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorSelect, setErrorSelect] = useState('');

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    if (user === '') {
      setErrorSelect('Please choose a user');
    }

    if (title.trim() === '') {
      setErrorTitle('Please enter the title');
    }

    if (user !== '' && title.trim() !== '') {
      preparedTodos.push(({
        id: Math.max(...todos.map(todo => +todo.id)) + 1,
        title: title,
        completed: false,
        userId: +user,
        user: users.find(item => item.id === +user) || null,
      }));

      setUser('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <form
        action="#"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setErrorTitle('');
          }}
          className="input is-link is-rounded"
          data-cy="titleInput"
          placeholder="Title"
        />
        {errorTitle && (
          <p className="error">
            {errorTitle}
          </p>
        )}

        <select
          name="user"
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
            setErrorSelect('');
          }}
          className="select"
          data-cy="userSelect"
        >
          <option value="">
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} data-ca={user}>
              {user.name}
            </option>
          ))}
        </select>
        {errorSelect && (
          <p className="error">
            {errorSelect}
          </p>
        )}

        <button type="submit" className="button">Add</button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
