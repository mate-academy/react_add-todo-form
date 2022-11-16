import React from 'react';
import './App.scss';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUser = () => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
  }));
};

export const App = () => {
  const [todos, setTodos] = React.useState(todosWithUser);
  const [title, setTitle] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState(0);
  const [isTitleError, setIsTitleError] = React.useState(false);
  const [isSlectedUserError, setIsSlectedUserError] = React.useState(false);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsSlectedUserError(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    const user = findUser(selectedUser);
    const allTodoIds = todos.map(todo => todo.id);
    const maxID = Math.max(...allTodoIds);

    if (user) {
      const newTodoWithUser = {
        id: maxID + 1,
        title,
        completed: false,
        userId: user.id,
        user,
      };

      setTodos(prevTodos => ([
        ...prevTodos,
        newTodoWithUser,
      ]));

      setTitle('');
      setSelectedUser(0);
      setIsTitleError(false);
      setIsSlectedUserError(false);
    }
  };

  const handelTitleChange = (value: string) => {
    setTitle(value.replace(/[^a-z0-9 ]/gi, ''));
    if (isTitleError) {
      setIsTitleError(false);
    }
  };

  const handelSelectUser = (value: number) => {
    setSelectedUser(value);
    if (isSlectedUserError) {
      setIsSlectedUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleAddTodo(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => handelTitleChange(event.target.value)}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => handelSelectUser(Number(event.target.value))}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSlectedUserError && (
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
