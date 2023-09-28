import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [titleValue, setTitleValue] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const fixTitle = (title: string) => {
    const result = title.match(/^[a-zA-Z0-9ЄІЇҐґєії\s]+/gi)?.join('').trim()
      || '';

    if (result === '') {
      setHasTitleError(true);
    }

    return result;
  };

  const resetForm = () => {
    setTitleValue('');
    setUserId(0);
    setHasUserIdError(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const getNewTodoID = () => Math.max(...todos.map(todo => todo.id)) + 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleValue(fixTitle(titleValue));

    setHasUserIdError(!userId);
    setHasTitleError(!titleValue);

    if (!fixTitle(titleValue) || !userId) {
      return;
    }

    if (!hasTitleError && !hasUserIdError) {
      const newTodo: Todo = {
        title: titleValue,
        completed: false,
        id: getNewTodoID(),
        userId,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              value={titleValue}
              type="text"
              data-cy="titleInput"
              onChange={handleInput}
              placeholder="Enter a title"
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleSelect}
            >
              <option value={0} disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
