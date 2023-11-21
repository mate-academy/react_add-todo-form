import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/Todo';

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [titlePatternError, setTitlePatternError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const [posts, setPosts] = useState(todosWithUsers);

  const pattern = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9\s]*$/;

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
    setTitlePatternError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);

    setTitleError(false);
    setSelectedUserIdError(false);

    setTitlePatternError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title && !selectedUserId) {
      setTitleError(true);
      setSelectedUserIdError(true);

      return;
    }

    if (!title) {
      setTitleError(true);

      return;
    }

    if (!pattern.test(title)) {
      setTitlePatternError(true);

      return;
    }

    if (!selectedUserId) {
      setSelectedUserIdError(true);

      return;
    }

    const newPost = {
      id: (Math.max(...posts.map(todo => todo.id)) + 1),
      title,
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId) || null,
    };

    setPosts(currentPosts => [...currentPosts, newPost]);

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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}

          {titlePatternError && (
            <span className="error">
              Only ua and en letters, digits, and spaces are allowed
            </span>
          )}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
