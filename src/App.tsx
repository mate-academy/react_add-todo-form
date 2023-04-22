import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [todosOnPage, setTodosOnPage] = useState([...todosFromServer]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setUserError(false);
  };

  const clearForm = () => {
    setTitle('');
    setUser(0);
  };

  const handleAddButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !user) {
      if (!title.trim()) {
        setTitleError(true);
      }

      if (!user) {
        setUserError(true);
      }

      return;
    }

    const newTitle = title.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    const maxId = todosOnPage.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    }).id;

    const newTodo: Todo = {
      id: maxId + 1,
      title: newTitle,
      userId: user,
      completed: false,
    };

    setTodosOnPage([...todosOnPage, newTodo]);
    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddButton}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <span>&nbsp;</span>
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <span>&nbsp;</span>
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="user"
            value={user}
            onChange={handleUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(userFromServer => {
              const { id, name } = userFromServer;

              return (
                <option value={id} key={id}>{name}</option>
              );
            })}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosOnPage} users={usersFromServer} />
    </div>
  );
};
