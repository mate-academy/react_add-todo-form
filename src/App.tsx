import React, { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  function getNewTodoId(arr: Todo[]) {
    const allId = arr.map(item => item.id);
    const maxNum = Math.max(...allId);

    return maxNum + 1;
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    setTodos([...todos, {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: selectedUser,
    }]);

    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleOnSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
