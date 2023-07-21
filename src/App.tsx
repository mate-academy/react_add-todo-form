import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Post } from './types/Post';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialPost = todosFromServer.map(post => ({
  ...post,
  user: getUserById(post.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cleanedValue = event.target.value
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(cleanedValue);
    setHasTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserIdError(false);
  }

  function getNewPostId(posts: Post[]) {
    const maxId = Math.max(...posts.map(post => post.id));

    return maxId + 1;
  }

  const [todos, setPosts] = useState<Post[]>(initialPost);

  const addPost = (post: Post) => {
    const newPost = {
      ...post,
      id: getNewPostId(todos),
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  function reset() {
    setTitle('');
    setUserId(0);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setUserIdError(!userId);
    setHasTitleError(!title);

    if (!title || !userId) {
      return;
    }

    addPost({
      user: getUserById(userId),
      id: 0,
      title,
      userId,
      completed: false,
    });
    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>

          <input
            id="title"
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
          <label htmlFor="userId">User:&nbsp;</label>

          <select
            id="userId"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
