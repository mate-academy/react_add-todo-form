import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/ToDo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [toDoList, setToDoList] = useState<Todo[]>(todosFromServer);

  const handleSunbitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!user);

    if (!title.trim() || !user) {
      return;
    }

    const newToDo: Todo = {
      id: toDoList.length + 1,
      title,
      completed: false,
      userId: +user,
    };

    setToDoList([...toDoList, newToDo]);

    setTitle('');
    setUser('');
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setTitleError(!event.currentTarget.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.currentTarget.value);
    setUserError(!event.currentTarget.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSunbitForm}>
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:&nbsp;
            <select
              id="user"
              data-cy="userSelect"
              value={user}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(userFromServer => (
                <option key={userFromServer.id} value={userFromServer.id}>
                  {userFromServer.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
