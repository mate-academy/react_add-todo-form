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
  const [chosenUserId, setChosenUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [selectError, setSelectError] = useState('');

  // const addUser = () => {
  //   if (!inputedTitle) {
  //     setTitleError('Please enter the title');
  //   }

  //   if (chosenUserId === 0) {
  //     setSelectError('Please choose a user');
  //   } else {
  //     const createdUser = {
  //       title: inputedTitle,
  //       id: preparedUsers.length + 1,
  //       user: usersFrom.find(user => user.id === chosenUserId),
  //       userId: chosenUserId,
  //       completed: false,
  //     };

  //     setPreparedUsers([...preparedUsers, createdUser]);
  //     setInputedTitle('');
  //     setChosenUserId(0);
  //   }
  // };

  const addUser = () => {
    const createdUser = {
      title: inputedTitle,
      id: preparedUsers.length + 1,
      user: usersFrom.find(user => user.id === chosenUserId),
      userId: chosenUserId,
      completed: false,
    };

    setPreparedUsers([...preparedUsers, createdUser]);
  };

  const checkTheInput = (input: string | number) => {
    if (typeof (input) === 'string') {
      if (input.toUpperCase() !== input.toLowerCase()
    || +input || input === ' ' || input === '') {
        setInputedTitle(input);
      }
    }
  };

  const test = () => {
    if (!inputedTitle) {
      setTitleError('error no title');
    }

    if (chosenUserId === 0) {
      setSelectError('no user selected');
    }

    if (inputedTitle && chosenUserId !== 0) {
      setSelectError('');
      setTitleError('');

      addUser();

      setInputedTitle('');
      setChosenUserId(0);
    }
  };

  console.log(chosenUserId);

  return (
    <div className="container">
      <div className="app">
        <h1>Static list of todos</h1>
        <h3>Add a new user</h3>
        <div>
          <form
            className="form"
            method="submit"
            onSubmit={(event) => {
              event.preventDefault();
              test();
            }}
          >
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
              name="todos"
              className="select-the-user"
              defaultValue={chosenUserId}
              onChange={(event) => {
                setChosenUserId(+event.target.value);
                setSelectError('');
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose the user
              </option>
              {usersFrom.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            <span className="form__input-error">{selectError}</span>
            <button
              type="submit"
              className="btn"
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
