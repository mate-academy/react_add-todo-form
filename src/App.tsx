import cn from 'classnames';
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function findUserById(id: number): User | null {
  const foundedUser = usersFromServer.find(user => user.id === id);

  return foundedUser || null;
}

export const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasuserIdError, setHasUserIdError] = useState(false);

  const [todosToView, setTodosToView] = useState(todosWithUser);

  function getNewTodoId(todos: Todo[]) {
    const maxId = Math.max(...todos.map(post => post.id));

    return maxId + 1;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todosToView),
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setTodosToView(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={handleIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasuserIdError
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todosToView.map(todo => (
          <article
            data-id={todo.id}
            className={cn(
              'TodoInfo',
              { 'TodoInfo--completed': todo.completed },
            )}
            key={todo.id}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            {todo.user && (
              <a className="UserInfo" href={`mailto:${todo.user.email}`}>
                {todo.user.name}
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
