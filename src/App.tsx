import React, { useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { getNewTodoId } from './utils/helpes';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUserById = (id: number) => (
  usersFromServer.find(user => user.id === id)
    || null
);

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);
  const [todos, setTodos] = useState(getTodos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userSelect) {
      setUserSelectError(true);
    }

    if (!userSelect || !title) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(Number(userSelect)),
      title: title.trim(),
      userId: Number(userSelect),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserSelect(0);
  };

  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserSelect(Number(event.target.value));
    setUserSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:

            <input
              type="text"
              data-cy="titleInput"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:

            <select
              data-cy="userSelect"
              name="user"
              id="user"
              value={userSelect}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userSelectError && (
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
