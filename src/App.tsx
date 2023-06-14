import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import TodoList from './components/TodoList/TodoList';

const initialData = () => {
  return (
    todosFromServer.map((todo) => {
      return ({
        ...todo,
        user: usersFromServer
          .find((user: User) => user.id === todo.userId) || null,
      });
    })
  );
};

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [todosForRender, setTodos] = useState(initialData);

  const todoUpdater = () => {
    const maxId = Math.max(...todosForRender.map(({ id }) => id), 0);

    const newTodo: Todo = {
      id: (maxId + 1),
      title: newTitle,
      completed: false,
      userId: +selectedUserId,
      user: usersFromServer
        .find((user: User) => user.id === +selectedUserId) || null,
    };

    const updatedTodos = todosForRender.map(todo => ({ ...todo }));

    updatedTodos.push(newTodo);

    setTodos(updatedTodos);
    setNewTitle('');
    setSelectedUserId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setSelectError(true);
    }

    if (selectedUserId && newTitle) {
      todoUpdater();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(event.target.value);
                setSelectError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosForRender} />
    </div>
  );
};
