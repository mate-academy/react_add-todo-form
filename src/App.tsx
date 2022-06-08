/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';

import todosFrom from './api/todos';
import usersFrom from './api/users';

import { User, Todo } from './types';

import { TodoList } from './components/TodoList';

const prepareTodos = (users: User[], todos: Todo[]) => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId || null),

  }));
};

export const preparedTodos = prepareTodos(usersFrom, todosFrom);

const App: React.FC = () => {
  const [preparedUsers, setPreparedUsers] = useState(preparedTodos);
  const [inputedTitle, setInputedTitle] = useState('');
  const [createdId, setCreatedId] = useState(0);
  const [chosenUserId, setChosenUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [selectError, setSelectError] = useState('');

  const addUser = () => {
    if (!inputedTitle) {
      setTitleError('Please enter the title');
    }

    if (chosenUserId === 0) {
      setSelectError('Please choose a user');
    } else {
      setCreatedId(preparedUsers.length + 1);
      const createdUser = {
        title: inputedTitle,
        id: createdId,
        user: usersFrom.find(user => user.id === chosenUserId),
        userId: chosenUserId,
        completed: false,
      };

      setPreparedUsers([...preparedUsers, createdUser]);
      setInputedTitle('');
    }
  };

  const checkTheInput = (input: string | number) => {
    if (typeof (input) === 'string') {
      if (input.toUpperCase() !== input.toLowerCase()
    || +input || input === ' ' || input === '') {
        setInputedTitle(input);
      }
    }
  };

  return (
    <div className="container">
      <div className="app">
        <h1>Static list of todos</h1>
        <h3>Add a new user</h3>
        <div>
          <form className="form">
            <div className="form__input">
              <input
                type="text"
                placeholder="Title"
                className="form__input-the-input"
                name="title"
                value={inputedTitle}
                onChange={(event) => {
                  checkTheInput(event.target.value);
                  setTitleError('');
                }}
              />
            </div>
            <span className="form__input-error">{titleError}</span>

            <select
              name="users"
              className="select-the-user"
              defaultValue={chosenUserId}
              onChange={(event) => {
                setChosenUserId(+event.target.value);
                setSelectError('');
              }}
            >
              <option
                value={0}
              >
                Choose the user
              </option>
              {usersFrom.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <span className="form__input-error">{selectError}</span>
            <button
              type="button"
              className="btn"
              onClick={() => {
                addUser();
              }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="todos">
        <TodoList todos={preparedUsers} />
      </div>
    </div>
  );
};

export default App;
