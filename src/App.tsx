import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => userId === user.id) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getPostId(posts: Todo[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App = () => {
  const [posts, setPosts] = useState(todos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]+$/;

    if (!title.trim()) {
      setTitleError('Please enter a title');
    } else if (!titleRegex.test(title)) {
      setTitleError('Title can only contain letters, numbers, and spaces');
    }

    if (userId === 0) {
      setUserIdError('Please choose a user');
    }

    if (!title.trim() || !titleRegex.test(title) || userId === 0) {
      return;
    }

    const newPost: Todo = {
      id: getPostId(posts),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setPosts(prevPosts => [...prevPosts, newPost]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={event => handleSubmit(event)}>
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User:&nbsp;</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
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

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
