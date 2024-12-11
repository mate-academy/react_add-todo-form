import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ToDo } from './props/TODO';

const orijenTodos: ToDo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(us => todo.userId === us.id),
  };
});

export const App: React.FC = () => {
  const [userID, setUserID] = useState(0);
  const [nameTask, setNameTask] = useState('');
  const [userIDError, checkUserIDError] = useState(false);
  const [nameTaskError, checKNameTaskError] = useState(false);
  const [todos, addTodos] = useState([...orijenTodos]);

  function chooseTaskName(e: React.ChangeEvent<HTMLInputElement>) {
    setNameTask(e.target.value);
    checKNameTaskError(!e.target.value);
  }

  function chooseUser(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserID(+e.target.value);
    checkUserIDError(!e.target.value);
  }

  function Add(e: React.FormEvent): undefined {
    e.preventDefault();

    checkUserIDError(!userID);
    checKNameTaskError(!nameTask);

    if (!userID || !nameTask) {
      return;
    }

    const todo: ToDo = {
      id: Math.max(...todos.map(td => td.id)) + 1,
      title: nameTask,
      completed: false,
      userId: userID,
      user: usersFromServer.find(us => userID === us.id),
    };

    addTodos([...todos, todo]);
    setNameTask('');
    setUserID(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={nameTask}
            onChange={chooseTaskName}
          />
          {nameTaskError ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <div className="field">
          User:
          <select data-cy="userSelect" value={userID} onChange={chooseUser}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIDError ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton" onClick={Add}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
