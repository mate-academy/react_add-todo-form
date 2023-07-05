import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDo } from './types/ToDo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(usr => usr.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [toDoList, setToDoList] = useState<ToDo[]>(todosWithUsers);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [userError, setUserError] = useState<boolean>(false);

  const getNextId = () => Math.max(...toDoList.map(todo => todo.id)) + 1;

  const resetForm = () => {
    setTitle('');
    setTitleError(false);

    setUserId(0);
    setUserError(false);
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = usersFromServer.find(usr => usr.id === userId);

    setTitleError(!title);
    setUserError(!userId);

    if (!userId || !title) {
      return;
    }

    setToDoList(prevToDoList => [
      ...prevToDoList,
      {
        id: getNextId(),
        title,
        userId,
        completed: false,
        user,
      },
    ]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={formSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
