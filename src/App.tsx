import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newPost, setNewPost] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const maxId = newPost
    .reduce((max, todo) => (todo.id > max ? todo.id : max), 0) + 1;

  const addPost = ({ newTodo }: { newTodo: Todo; }) => {
    setNewPost(currMovies => [...currMovies, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
      .replace(/[^A-Za-z0-9\u0400-\u04FF\s]/g, '');

    setTitle(newTitle);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const reset = () => {
      setTitle('');
      setUserId(0);
    };

    addPost({
      newTodo: {
        id: maxId,
        title: title.trim(),
        completed: false,
        userId,
        user: getUserById(userId),
      },
    });

    reset();
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
          <label className="label" htmlFor="todo-title">
            Title:&nbsp;
          </label>

          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">
            User:&nbsp;
          </label>

          <select
            id="todo-user"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
        <TodoList todos={newPost} />
      </form>
    </div>
  );
};
