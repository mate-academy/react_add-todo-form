import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUser = (userId: number): User | null => (
  usersFromServer.find(user => userId === user.id) || null
);

const getValidId = (todos: Todo[]): number => {
  const existingIds = todos.map(todo => todo.id);

  return Math.max(...existingIds) + 1;
};

const todosWithUser: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasNoTitleError, setHasNoTitleError] = useState(false);
  const [userNotSelectedError, setUserNotSelectedError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserNotSelectedError(false);

    setSelectedUser(+event.currentTarget.value);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasNoTitleError(false);

    const newTitle = event.currentTarget.value;

    const filteredTitle = newTitle.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');

    setTitle(filteredTitle);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasNoTitleError(true);
    }

    if (!selectedUser) {
      setUserNotSelectedError(true);
    }

    const newtitle = title.trim();

    if (title && selectedUser) {
      const newTodo = {
        id: getValidId(todos),
        userId: selectedUser,
        title: newtitle,
        completed: false,
        user: getUser(selectedUser),
      };

      setTodos((prevTodos) => ([
        ...prevTodos,
        newTodo,
      ]));

      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="What user must to do..."
              value={title}
              onChange={handleTitle}
            />
          </label>

          {hasNoTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUser}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {userNotSelectedError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
