import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoInfo } from './components/TodoInfo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [newUser, setNewUser] = useState(0);
  const [hasNewUser, setHasNewUser] = useState(false);

  const visiblePost = todosFromServer.map(post => {
    const user = usersFromServer.find(us => us.id === post.userId);

    return {
      ...post,
      user,
    };
  });

  const [posts, setPosts] = useState(visiblePost);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const findUser = usersFromServer.find(user => user.id === newUser);

    setHasTitleError(!title);
    setHasNewUser(!newUser);

    if (!title || !newUser) {
      return;
    }

    if (!findUser) {
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      userId: findUser.id,
      completed: false,
      user: findUser,
    };

    setPosts(current => [...current, newPost]);

    setTitle('');
    setNewUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
              setHasNewUser(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newUser}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setNewUser(+event.target.value);
              setHasTitleError(false);
              setHasNewUser(false);
            }}
          >
            <option value={0}>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasNewUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoInfo posts={posts} />
      </section>
    </div>
  );
};
