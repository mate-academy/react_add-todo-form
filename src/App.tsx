import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import React, { useState } from 'react';
import { getPreparedTodos, titleCharsWhiteList } from './utils/utils';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const preparedTodos = getPreparedTodos(todos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const isTodoValid = title && userId;

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setIsClicked(false);
  };

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisited(true);
    setTitle(event.target.value.replace(titleCharsWhiteList, ''));
  };

  const handleSubmitClick = () => {
    setIsClicked(true);
    setIsVisited(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isTodoValid) {
      addTodo({
        title,
        completed: false,
        userId: userId,
        id: Math.max(...todos.map(({ id }) => id)) + 1,
      });

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputField}
            />
          </label>

          {!title && isClicked && !isVisited && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => setUserId(+event.target.value)}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!userId && isClicked && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmitClick}
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
