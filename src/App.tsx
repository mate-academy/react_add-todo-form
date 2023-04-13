import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

type ErrorMessage = {
  titleError: string,
  userError: string,
};

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [allTodos, setAllTodos] = useState(todos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const largestId = Math.max(...allTodos.map(todo => todo.id));
  const [errorMessage, setErrorMessage] = useState({
    titleError: '',
    userError: '',
  });
  const validation = () => {
    const errors: ErrorMessage = {
      titleError: '',
      userError: '',
    };
    let isError = false;

    if (!titleTodo) {
      errors.titleError = 'Please enter a title';
      isError = true;
    }

    if (selectedUserId === 0) {
      errors.userError = 'Please choose a user';
      isError = true;
    }

    if (isError) {
      setErrorMessage(errors);
    }

    return isError;
  };

  const clearForm = () => {
    setTitleTodo('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (validation()) {
      return;
    }

    const newTodo: Todo = {
      id: largestId + 1,
      title: titleTodo,
      completed: false,
      userId: selectedUserId,
      user: getUser(selectedUserId),
    };

    setAllTodos(oldArr => [...oldArr, newTodo]);
    clearForm();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я\s]*$/);

    if (!regex.test(event.target.value)) {
      return;
    }

    setTitleTodo(event.target.value);
    if (titleTodo !== event.target.value) {
      errorMessage.titleError = '';
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        className="form"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label className="formField" htmlFor="titleId">Title: </label>
          <input
            id="titleId"
            type="text"
            name="titleTodo"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleTodo}
            onChange={handleInputChange}
          />
          <span
            className="error"
          >
            {errorMessage.titleError}
          </span>
        </div>
        <div className="field">
          <label className="formField" htmlFor="userId">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              if (selectedUserId !== +event.target.value) {
                errorMessage.userError = '';
              }
            }}
          >
            <option id="userId" value={0} disabled>Choose a user</option>
            {
              usersFromServer.map((user: User) => (
                <option
                  id="userId"
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          <span
            className="error"
          >
            {errorMessage.userError}
          </span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
