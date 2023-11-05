import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [addedToDos, setAddedToDos] = useState([...todosFromServer]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserError(userId === 0);

    setTitleError(!title);

    if (userId !== 0 && title) {
      const newToDo = {
        id: Math.max(...addedToDos.map(toDo => toDo.id)) + 1,
        title,
        completed: false,
        userId,
      };

      setAddedToDos(currenttoDos => [...currenttoDos, newToDo]);
      clear();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >

        <label className="field">
          Title:&nbsp;
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
        </label>

        { titleError && (
          <span className="error">Please enter a title</span>
        )}

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              required
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);

                setUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          { userError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={addedToDos} />
    </div>
  );
};
