import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoProps } from './components/TodoInfo';
import { UserProps } from './components/UserInfo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): UserProps | undefined {
  return usersFromServer.find(user => user.id === userId);
}

function sanitizeTitle(title: string): string {
  return title.replace(/[^\p{L}\d\s]/giu, '').trim();
}

function validateTitle(title: string) {
  return title.trim() === '' ? 'Please enter a title' : '';
}

function validateUser(userId: number) {
  return userId ? '' : 'Please choose a user';
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState<{ title: string; user: string }>({
    title: '',
    user: '',
  });

  const [todos, setTodos] = useState<TodoProps[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      userObject: getUserById(todo.userId) ?? {
        id: 0,
        name: 'Unknown',
        username: '',
        email: '',
      },
    })),
  );

  const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;
  const numberUserId = Number(userId);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(sanitizeTitle(event.target.value));

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = Number(event.target.value);

    setUserId(selectedId);

    if (errors.user) {
      setErrors(prev => ({ ...prev, user: '' }));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const titleError = validateTitle(title);
    const userError = validateUser(numberUserId);

    if (titleError || userError) {
      setErrors({ title: titleError, user: userError });

      return;
    }

    const newTodo: TodoProps = {
      id: nextId,
      title,
      userId: numberUserId,
      completed: false,
      userObject: getUserById(numberUserId) ?? {
        id: 0,
        name: 'Unknown',
        username: '',
        email: '',
      },
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setErrors({ title: '', user: '' });
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            className={classNames({ 'is-danger': errors.title })}
          />
          {errors.title && <p className="help is-danger">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            value={userId}
            data-cy="userSelect"
            onChange={handleUserChange}
            className={classNames({ 'is-danger': errors.user })}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && <p className="help is-danger">{errors.user}</p>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
