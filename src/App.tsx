import classNames from 'classnames';

import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUsers = todosFromServer.map(todo => {
  const chosen = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: chosen || null,
  };
});

export const App = () => {
  const [chosenUserValue, setChosenUserValue] = useState('0');
  const [newTitle, setNewTitle] = useState('');
  const [listWithUsers, setListWithUsers] = useState(todosWithUsers);
  const [addClicked, setAddClicked] = useState(false);
  const isUserNotChosen = chosenUserValue === '0';

  const createTask = () => {
    if (!newTitle.trim().length || chosenUserValue === '0') {
      return;
    }

    const chosenUser = usersFromServer.find(user => (
      user.id === +chosenUserValue));

    if (!chosenUser) {
      return;
    }

    const maxId = Math.max(...listWithUsers.map(el => el.id));

    setListWithUsers(list => ([
      ...list,
      {
        user: chosenUser,
        id: (maxId + 1),
        title: newTitle,
        completed: false,
        userId: chosenUser.id,
      },
    ]));

    setAddClicked(false);
    setNewTitle('');
    setChosenUserValue('0');
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          setAddClicked(true);
          createTask();
        }}
      >
        <div className="field">
          <label
            htmlFor="todoTitle"
            className="label"
          >
            Title
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="write the Title of todo"
            value={newTitle}
            id="todoTitle"
            className={classNames('input',
              { 'is-danger': (addClicked && !newTitle) })}
            onChange={(event) => {
              const { value } = event.target;
              const titleToAdd = value.replace(/[.*+!@#&%^?^${}()|[\]\\]/g, '');

              setNewTitle(titleToAdd);
            }}
          />
          {addClicked && !newTitle && (
            <span className="error span">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="userTodo"
            className="label"
          >
            User:
          </label>
          <div className={classNames('select',
            { 'is-danger': addClicked && isUserNotChosen })}
          >
            <select
              data-cy="userSelect"
              value={chosenUserValue}
              id="userTodo"
              onChange={(event) => (
                setChosenUserValue(event.target.value))}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {addClicked && isUserNotChosen && (
            <div>
              <span className="error span">
                Please choose a user
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={listWithUsers}
      />
    </div>
  );
};
