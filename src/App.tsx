import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [showTitleError, setTitleError] = useState(false);
  const [showUserError, setUserError] = useState(false);

  const getNewId = (array: { id: number }[]) => (
    Math.max(...array.map(el => el.id)) + 1
  );

  const reset = () => {
    setNewTitle('');
    setNewUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = () => {
    if (!newTitle) {
      setTitleError(true);
    }

    if (!newUserId) {
      setUserError(true);
    }

    if (newTitle && newUserId) {
      setTodos(prev => {
        const newTodo = {
          id: getNewId(prev),
          title: newTitle,
          completed: false,
          userId: newUserId,
          user: getUserById(newUserId),
        };

        return [...prev, newTodo];
      });

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={event => {
                setNewTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={newUserId}
              onChange={event => {
                setNewUserId(+event.target.value);
                setUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {showUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
