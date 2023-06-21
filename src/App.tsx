import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError('');
    setUserError('');

    if (title.trim() === '') {
      setTitleError('Please enter a title');
    }

    if (selectedUser === '') {
      setUserError('Please choose a user');
    }

    if (title.trim() !== '' && selectedUser !== '') {
      const newId = Math.max(...todos.map(todo => todo.id)) + 1;

      const newTodo: Todo = {
        id: newId,
        title: title.trim(),
        userId: +selectedUser,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setSelectedUser('');
    }
  };

  const titleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const userChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={titleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={userChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id="1"
            className={classNames(
              'TodoInfo',
              { 'TodoInfo--completed': todo.completed },
            )}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            <a
              className="UserInfo"
              href={`mailto:${usersFromServer.find((user) => user.id === todo.userId)?.email}`}
            >
              {usersFromServer.find((user) => user.id === todo.userId)?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
