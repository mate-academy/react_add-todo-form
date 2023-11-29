import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Types';
import { TodoList } from './components/TodoList';
import { getUserById } from './utils/userId';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUserById(todo.userId) || null,
  }));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userErrorMessage, setUserErrorMessage] = useState(false);

  const [todos, setTodos] = useState(initialTodos);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage(false);
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+event.target.value);
    setUserErrorMessage(false);
  };

  const addTodo = (todo: Todo) => {
    setTodos(existTodos => [...existTodos, todo]);
  };

  const maxId = Math.max(...todosFromServer.map(todo => todo.id));

  const addNewPost = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleErrorMessage(!title);
    setUserErrorMessage(!userId);

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !userId) {
      return;
    }

    addTodo({
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={addNewPost}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleErrorMessage && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
            required
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userErrorMessage && (
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
