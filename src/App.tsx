import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

let lastId = Math.max(...todos.map(({ id }) => id));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userHasError, setUserHasError] = useState(false);
  const [titleHasError, setTitleHasError] = useState(false);

  const getNewTodo = () => {
    const newId = lastId + 1;

    lastId += 1;

    return {
      id: newId,
      title,
      completed: false,
      userId: +selectedUserId,
      user: getUserById(+selectedUserId),
    };
  };

  const titleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setUserHasError(false);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleHasError(!title);
    setUserHasError(!selectedUserId);

    if (title && selectedUserId) {
      setNewTodos([
        ...newTodos,
        getNewTodo(),
      ]);

      setTitle('');
      setSelectedUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <label htmlFor="titleId">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            name="titleId"
            value={title}
            placeholder="Please enter a title"
            onChange={titleInput}
          />

          {titleHasError
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelectedId">
            User:
          </label>

          <select
            name="userSelectedId"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={selectUser}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userHasError
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
