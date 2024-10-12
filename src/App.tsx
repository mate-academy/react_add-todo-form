import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from './types/PostType';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(posts: Post[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [posts, setPosts] = useState(todos);

  function addTodosInArr({ id, ...data }: Post) {
    const newPost = {
      id: id || getNewPostId(posts),
      ...data,
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  }

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserIdError(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    addTodosInArr({
      id: getNewPostId(posts),
      title: trimmedTitle,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
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
