import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Post } from './types/types';
import { TodoList } from './components/TodoList';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const prepearedPosts = todosFromServer.map(post => ({
  ...post,
  user: getUserById(post.userId),
}));

const getPostId = (posts: Post[]) => {
  return Math.max(...posts.map(post => post.id)) + 1;
};

export const App = () => {
  const [posts, setPosts] = useState(prepearedPosts);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const onAdd = (post: Post) => {
    const newPost = { ...post, id: getPostId(posts) };

    setPosts(currentPost => [...currentPost, newPost]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(parseFloat(event.target.value));
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            placeholder="Enter a title"
            className="input"
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            defaultValue="0"
            value={userId}
            onChange={handleUserNameChange}
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

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
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
