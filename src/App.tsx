import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const getUserById = (id: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
};

const newTodos = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [todos, setTodos] = useState(newTodos);
  const [isTitleOnSubmit, setIsTitleOnSubmit] = useState(false);
  const [isUserOnSubmit, setIsUserOnSubmit] = useState(false);

  const selectedUser = getUserById(newTodoUserId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      userId: newTodoUserId,
      completed,
      user: getUserById(newTodoUserId),
    };

    setIsTitleOnSubmit(!newTodoTitle);
    setIsUserOnSubmit(!newTodoUserId);

    if (newTodoTitle && newTodoUserId) {
      setNewTodoTitle('');
      setNewTodoUserId(0);
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>{selectedUser ? selectedUser.name : 'No user selected'}</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={(event) => {
                setNewTodoTitle(event.target.value);
              }}
            />
          </label>
          {isTitleOnSubmit && (
            <span
              className="error"
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={newTodoUserId}
              onChange={event => {
                setNewTodoUserId(+event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserOnSubmit && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <div className="field">
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(event) => {
                setCompleted(event.target.checked);
              }}
            />
            Is Completed
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
