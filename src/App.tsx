import React, { FC, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { FullTodo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (userId: number) => (
  usersFromServer.find(user => user.id === userId)
);

const preperedTodos: FullTodo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

export const App: FC = () => {
  const [todos, setTodos] = useState(preperedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const addTodo = (titleInput: string, userSelected: number) => {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      user: getUser(userSelected),
    };

    setTodos((currentTodo) => ([...currentTodo, newTodo]));
  };

  const resetForm = () => {
    setSelectedUser(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    addTodo(title, selectedUser);

    resetForm();
  };

  const changeTitleHandler = (value: string) => {
    const lastLeter = value[value.length - 1];

    if (!Number.isNaN(parseFloat(lastLeter))) {
      return;
    }

    setTitle(value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          value={title}
          onChange={event => changeTitleHandler(event.target.value)}
          type="text"
          placeholder="Add title"
        />
        {hasTitleError && (
          <span className="error">Add name</span>
        )}
        <select
          value={selectedUser}
          onChange={event => {
            setSelectedUser(+event.target.value);
            setHasSelectedUserError(false);
          }}
        >
          <option
            value="0"
            disabled
            selected
          >
            Select user
          </option>
          {usersFromServer.map(({ id, name }) => (
            <option
              value={id}
              key={id}
            >
              {name}
            </option>
          ))}
        </select>
        {hasSelectedUserError && (
          <span className="error">Select user</span>
        )}
        <button type="submit">
          Submit
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>
              {todo.title}
            </h3>
            <div className="user__name">
              {todo.user?.name}
            </div>
            <a
              href={`mailto: ${todo.user?.email}`}
            >
              {todo.user?.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
