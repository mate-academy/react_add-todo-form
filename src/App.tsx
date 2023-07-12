import { useState } from 'react';
import classNames from 'classnames';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';
import { User } from './types/User';

const todosWithUser = todosFromServer.map(todo => {
  const userForTodo = usersFromServer.find(user => todo.userId === user.id);

  return {
    ...todo,
    user: userForTodo as User,
  };
});

export const App = () => {
  const [allTodos, setAllTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const findUser = (id: number) => {
    return usersFromServer.find(user => user.id === id) as User;
  };

  const addNewTodo = (newTodo: Todos) => {
    setAllTodos(todos => [...todos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetFields = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const getNewId = (todos: Todos[]) => {
    const maxId = Math.max(
      ...todos.map(todo => todo.id),
    );

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addNewTodo({
      id: getNewId(allTodos),
      title,
      completed: false,
      userId,
      user: findUser(userId),
    });

    resetFields();
  };

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title" className="label">Title: </label>
          <input
            type="text"
            className={classNames(
              'input is-success', { 'is-danger': hasTitleError },
            )}
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setHasTitleError(!title)}
          />

          {hasTitleError && (
            <span className="error help is-danger">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id" className="label">User: </label>

          <div className={classNames(
            'select is-success', { 'is-danger': hasUserIdError },
          )}
          >
            <select
              data-cy="userSelect"
              id="user-id"
              value={userId}
              onChange={handleUserIdChange}
              onBlur={() => setHasUserIdError(!userId)}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {hasUserIdError && (
            <span className="error help is-danger">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-success"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={allTodos}
      />
    </div>
  );
};
