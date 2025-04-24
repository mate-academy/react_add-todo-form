import './App.scss';

import todosFromServer from './api/todos';
import userFromServer from './api/users';
import { getUserById } from './utils/getUsersId';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { getNewId } from './utils/getNewId';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasIdError, setHasIdError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSetId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasIdError(false);
  };

  const handleClear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewId(newTodos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setNewTodos(current => [...current, newTodo]);

    handleClear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <label className="label" htmlFor="post-title">
          Title:
        </label>

        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            id="post-title"
            placeholder="Please enter a title"
            value={title}
            onChange={handleSetTitle}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <label className="label" htmlFor="post-user">
          User:
        </label>
        <div className="field">
          <select
            data-cy="userSelect"
            id="post-user"
            value={userId}
            onChange={handleSetId}
          >
            <option value="0">Choose a user</option>
            {userFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
