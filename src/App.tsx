import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);

  const [errors, setErrors] = useState({ title: '', selectUser: '' });
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  function reset() {
    setErrors({ title: '', selectUser: '' });
    setTitle('');
    setSelectUser(0);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      title: !title ? 'Please enter a title' : '',
      selectUser: !selectUser ? 'Please choose a user' : '',
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.selectUser) {
      const biggestId: number = allTodos.reduce((a, c) =>
        a.id > c.id ? a : c,
      ).id;

      const newTodo: Todo = {
        id: biggestId + 1,
        title,
        completed: false,
        userId: +selectUser,
        user: usersFromServer.find(user => +selectUser === user.id) || null,
      };

      setAllTodos(prevTodos => [...prevTodos, newTodo]);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {errors.title && !title && (
            <span className="error">Please {errors.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectUser}
            onChange={event => setSelectUser(Number(event.target.value))}
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

          {!Boolean(selectUser) && errors.selectUser && (
            <span className="error">Please {errors.selectUser}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
