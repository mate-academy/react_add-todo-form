import { ChangeEvent, FormEvent, useState } from 'react';
import { getUser } from './helpers';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const visibleTodos: Todo[] = todosFromServer.map(todo => {
  const newTodo = {
    ...todo,
    user: getUser(usersFromServer, todo.userId),
  };

  return newTodo;
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title === '' || userId === 0) {
      setTitleError(title === '');
      setUserIdError(userId === 0);

      return;
    }

    const lastId = Math.max(0, ...visibleTodos.map(({ id }) => id));

    const newTodo: Todo = {
      id: lastId + 1,
      title,
      userId,
      completed: false,
      user: getUser(usersFromServer, userId),
    };

    visibleTodos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleError(false);

    setTitle(
      value.replace(/[^\wа-яa-z\d ]/gi, ''),
    );
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserIdError(false);
    setUserId(+value);
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
          <label htmlFor="title">
            {'Title: '}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}
          </label>
          <select
            data-cy="userSelect"
            name="user"
            id="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
