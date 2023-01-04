import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User, Todo } from './types';
import './App.scss';

const getUserById = (userId: number) => (
  usersFromServer.find(user => user.id === userId) as User
);

const initTodos: Todo[] = todosFromServer.map(todo => ({
  user: getUserById(todo.userId),
  ...todo,
}));

export const App: React.FC<{}> = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setUser] = useState('');
  const [todos, setTodos] = useState(initTodos);
  const [showTitleError, setTitleError] = useState(false);
  const [showUserError, setUserError] = useState(false);

  const generateId = () => (
    Math.max(...todos.map(todo => todo.id)) + 1
  );

  const createTodo = () => {
    setTitleError(!title);
    setUserError(!selectedUser);

    if (title && selectedUser) {
      setTodos(state => (
        state.concat({
          id: generateId(),
          user: getUserById(+selectedUser),
          userId: +selectedUser,
          completed: false,
          title,
        })
      ));

      setTitle('');
      setUser('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createTodo();
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            name="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setUser(event.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {showUserError && (
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
