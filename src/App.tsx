import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getNewId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

function getValidatedTitle(title: string) {
  const titleRegex = /[^a-zа-я0-9 ]*/gi;
  let validatedTitle = title.trim();

  if (titleRegex.test(title)) {
    validatedTitle = validatedTitle.replace(titleRegex, '');
  }

  return validatedTitle;
}

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isUserSelected, setIsUserSelected] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitle(true);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setIsUserSelected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validatedTitle = getValidatedTitle(title);

    if (!userId) {
      setIsUserSelected(false);
    }

    if (!validatedTitle) {
      setHasTitle(false);
    }

    if (userId && title) {
      const newTodo = {
        id: getNewId(currentTodos),
        title: validatedTitle,
        userId,
        completed: false,
      };

      setCurrentTodos(prevTodos => [...prevTodos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App Todo">
      <h1 className="Todo__title title">Add todo form</h1>

      <form
        className="Todo__form"
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title"> Title </label>
          <input
            className="input"
            type="text"
            data-cy="titleInput"
            id="title"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {!hasTitle && (
            <p className="error help is-danger">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">User</label>
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {!isUserSelected && (
            <p className="error help is-danger"> Please choose a user </p>
          )}

        </div>

        <button
          className="button is-link"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
