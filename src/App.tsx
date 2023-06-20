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
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const visibleTodos: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleValid(true);
    }

    if (!username) {
      setIsUserSelected(true);
    }

    if (username && title.trim()) {
      const todoToAdd = prepareTodo(username, title);

      setTodos(current => ([...current, todoToAdd]));
      setTitle('');
      setUsername('');
    }
  };

  const handleUserChange = (event: Event) => {
    const { value } = event.target;

    setUsername(value);
    setIsUserSelected(false);
  };

  const handleTitleChange = (event: Event) => {
    const { value } = event.target;

    setTitle(value);
    setIsTitleValid(false);
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
            value={title}
            onChange={handleTitleChange}
          />

          {isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            value={username}
            onChange={handleUserChange}
            data-cy="userSelect"
            id="userSelect"
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserSelected && (
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
