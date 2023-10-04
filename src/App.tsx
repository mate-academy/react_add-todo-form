import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { ToDo } from './types/ToDo';

const getLargestId = (elements: ToDo[]) => {
  if (elements.length === 0) {
    return 0;
  }

  const ids = elements.map(element => element.id);

  return Math.max(...ids);
};

export const App: React.FC = () => {
  const [toDos, setToDos] = useState<ToDo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, SetUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    SetUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      const newToDo: ToDo = {
        id: getLargestId(toDos) + 1,
        title,
        userId,
        completed: false,
      };

      setToDos(currentToDos => [...currentToDos, newToDo]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="UserId">
            {'User: '}
          </label>
          <select
            id="UserId"
            value={userId}
            data-cy="userSelect"
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList toDos={toDos} />
    </div>
  );
};
