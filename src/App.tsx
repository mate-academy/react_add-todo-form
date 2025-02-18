/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/todo';
import { findUserById, getTodosMaxId } from './service';

export const App: React.FC = () => {
  const tasks = todosFromServer.map(todo => {
    return {
      ...todo,
      user: findUserById(todo.userId),
    };
  });

  const [todos, setTodos] = useState<ToDo[]>([...tasks]);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setErrorTitle(false);
    setErrorUser(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    setErrorTitle(!title);
    setErrorUser(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getTodosMaxId(todos) + 1,
        title: title,
        completed: false,
        userId: Number(userId),
        user: findUserById(Number(userId)),
      },
    ]);

    resetForm();
  };

  const handleUserIdChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = ev => {
    setUserId(+ev.target.value);
    setErrorUser(false);
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    setTitle(ev.target.value);
    setErrorTitle(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            value={title}
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="title">User: </label>
          <select
            id="select"
            value={userId}
            data-cy="userSelect"
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {[...usersFromServer].map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
