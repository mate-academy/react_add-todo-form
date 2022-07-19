import React, { useState } from 'react';
import users from './api/users';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { preparedTodos } from './types/Preraredtodo';

const App: React.FC = () => {
  const [title, SetTitle] = useState('');
  const [user, SetUser] = useState('');
  const [isValidTitle, SetValidTitle] = useState('');
  const [isValidUser, SetValidUser] = useState('');

  const handelClick = () => {
    if (!title) {
      SetValidTitle('Please enter the title');
    }

    if (!user) {
      SetValidUser('Please choose a user');
    }

    if (title !== '' && user !== '') {
      preparedTodos.push({
        userId: users.find(person => person.name === user)?.id || 0,
        id: preparedTodos[preparedTodos.length - 1].id + 1,
        title,
        completed: false,
        user: users.find(person => person.name === user) || null,
      });
      SetTitle('');
      SetUser('');
    }
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetTitle(event.target.value);
    SetValidTitle('');
  };

  const handleOnChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    SetUser(event.target.value);
    SetValidUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      Title:
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => handleOnChangeTitle(event)}
        data-cy="titleInput"
        className="todo--title"
      />
      {isValidTitle
      && (
        <span className="color--red">
          {isValidTitle}
        </span>
      )}

      <br />
      User:
      <select
        name="People"
        data-cy="userSelect"
        value={user}
        onChange={(event) => handleOnChangeUser(event)}
        className="todo--username"
      >
        <option value="">
          Choose an user
        </option>

        {users.map(person => (
          <option key={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      {isValidUser
      && (
        <span className="color--red">
          {isValidUser}
        </span>
      )}

      <br />

      <button
        type="button"
        onClick={handelClick}
      >
        Add
      </button>

      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
