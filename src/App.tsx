import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

export const App = () => {
  const defaultUserOption = 'Choose a user';
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(defaultUserOption);
  const [todos, setTodos] = useState(preparedTodos);
  const [titleErrorAlert, setTitleErrorAlert] = useState(false);
  const [selectedUserErrorAlert, setSelectedUserErrorAlert] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUser !== defaultUserOption && title !== '') {
      const newUser = findUserByName(selectedUser);

      setTodos(currentTodo => {
        const maxTodoId = Math.max(...currentTodo.map(todo => todo.id));

        setTitle('');
        setSelectedUser(defaultUserOption);

        return [
          ...currentTodo,
          {
            id: maxTodoId + 1,
            title,
            completed: false,
            userId: newUser ? newUser.id : null,
            user: newUser,
          },
        ];
      });
    }

    if (selectedUser === defaultUserOption) {
      setSelectedUserErrorAlert(true);
    }

    if (title === '') {
      setTitleErrorAlert(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorAlert(false);
  };

  const handleSelectedUserChange
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedUser(event.target.value);
      setSelectedUserErrorAlert(false);
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
          <label htmlFor="text">Title: </label>
          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleErrorAlert && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleSelectedUserChange}
          >
            <option value={defaultUserOption} disabled>
              {defaultUserOption}
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {selectedUserErrorAlert && (
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

      <TodoList todos={todos} />
    </div>
  );
};
