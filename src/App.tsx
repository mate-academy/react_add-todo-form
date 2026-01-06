import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';
import classNames from 'classnames';

const todoInfos = todosFromServer.map(todo => {
  const searchUser = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: {
      id: searchUser?.id,
      name: searchUser?.name,
      username: searchUser?.username,
      email: searchUser?.email,
    },
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const [userId, setUserId] = useState<number | null>(null);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const [userTodo, setUserTodo] = useState<Todos[]>(todoInfos);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const titleRegex = /^[A-Za-z0-9 ]+$/;
    const titleIsEmpty = title.trim() === '' || !titleRegex.test(title);
    const userIdIsMissing = !userId;

    setHasTitleError(titleIsEmpty);
    setHasUserIdError(userIdIsMissing);

    if (titleIsEmpty || userIdIsMissing) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    const nextId =
      userTodo.reduce((maxId, todo) => {
        return todo.id > maxId ? todo.id : maxId;
      }, 0) + 1;

    const newTodo: Todos = {
      id: nextId,
      title,
      userId,
      completed: false,
      user: {
        id: selectedUser?.id,
        name: selectedUser?.name,
        username: selectedUser?.username,
        email: selectedUser?.email,
      },
    };

    setUserTodo(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(null);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <label className="field__label" htmlFor="todo-title">
            Title
          </label>
          <input
            id="todo-title"
            className={classNames('field__input', {
              error__field: hasTitleError,
            })}
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={event => handleTitleChange(event)}
          />
          {hasTitleError && <p className="error">Please enter a title</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="todo-user">
            User
          </label>
          <select
            id="todo-user"
            className={classNames('field__select', {
              error__field: hasUserIdError,
            })}
            data-cy="userSelect"
            value={userId ?? 0}
            onChange={event => handleUserChange(event)}
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

          {hasUserIdError && <p className="error">Please choose a user</p>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={userTodo} />
    </div>
  );
};
