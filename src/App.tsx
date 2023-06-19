import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getUser, prepareTodo } from './helpers';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

interface Event {
  target: {
    value: string;
  }
}

export const App = () => {
  const [userNameToAdd, setUserNameToAdd] = useState('');
  const [titleToAdd, setTitleToAdd] = useState('');
  const [userIsSelected, setUserIsSelected] = useState(false);
  const [titleIsFilled, setTitleIsFilled] = useState(false);
  const [ToDos, setToDos] = useState(todosFromServer);

  const visibleTodos: Todo[] = ToDos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleToAdd) {
      setTitleIsFilled(true);
    }

    if (!userNameToAdd) {
      setUserIsSelected(true);
    }

    if (userNameToAdd && titleToAdd) {
      const todoToAdd = prepareTodo(userNameToAdd, titleToAdd);

      setToDos(current => ([...current, todoToAdd]));
      setTitleToAdd('');
      setUserNameToAdd('');
    }
  };

  const handleUserChange = (event: Event) => {
    const { value } = event.target;

    setUserNameToAdd(value);
    setUserIsSelected(false);
  };

  const handleTitleChange = (event: Event) => {
    const { value } = event.target;

    setTitleToAdd(value);
    setTitleIsFilled(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={titleToAdd}
            onChange={handleTitleChange}
          />

          {titleIsFilled && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            value={userNameToAdd}
            onChange={handleUserChange}
            data-cy="userSelect"
            id="userSelect"
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {userIsSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
