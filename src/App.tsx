import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(0);

  const todosWithUser: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find((user: User) => user.id === todo.userId),
  }));

  const [postList, setPostList] = useState<Todo[]>([...todosWithUser]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || userId === 0) {
      setError(true);

      return;
    }

    setPostList([
      ...postList,
      {
        id: postList[postList.length - 1].id + 1,
        title,
        completed: false,
        userId,
        user: usersFromServer.find(user => userId === user.id),
      },
    ]);

    setTitle('');
    setUserId(0);
    setError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a Title"
            value={title}
            onChange={handleTitleChange}
          />
          {error && !title.trim() && (
            <span className="error">Please chose a user</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value={0} disabled selected>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {error && userId === 0 && (
            <span className="error">Please chose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={postList} />
    </div>
  );
};
