import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/interface';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === +userId)
    || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newPost, setNewPost] = useState<Todo[]>(todos);

  const [title, setTitle] = useState<string>('');
  const [titleErr, setTitleErr] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [userIdErr, setUserIdErr] = useState<boolean>(false);

  const maxId = newPost
    .reduce((max, todo) => (todo.id > max ? todo.id : max), 0) + 1;

  const addPost = ({ newTodo }: { newTodo: Todo; }) => {
    setNewPost(currMovies => [...currMovies, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
      .replace(/[^A-Za-z0-9\u0400-\u04FF\s]/g, '');

    setTitle(newTitle);
    setTitleErr(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdErr(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0 || !userId) {
      if (title.trim().length === 0) {
        setTitleErr(true);
      }

      if (!userId) {
        setUserIdErr(true);
      }

      return;
    }

    addPost({
      newTodo: {
        id: maxId,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    });

    setTitle('');
    setUserId(0);
    setTitleErr(false);
    setUserIdErr(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="box Todo__form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleErr && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => {
              const { name, id } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {userIdErr && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList todos={newPost} />
      </form>
    </div>
  );
};
