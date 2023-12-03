import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { getNewTodoId } from './services/TodoId';

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
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const [todosToView, setTodosToView] = useState(todosWithUser);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    sethasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    sethasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todosToView),
      title: title.trim(),
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

          {hasUserIdError
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todosToView={todosToView} />
    </div>
  );
};
