import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleInputed, setIsTitleInputed] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const isTitleCorrect = (enteredTitle: string) => {
    if (/^[a-zA-Zа-яА-Я0-9\s]*$/.test(enteredTitle)) {
      setTitle(enteredTitle);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const getNewId = todos.reduce((prev, todo) => Math.max(prev, todo.id), 0);

    if (title.trim() === '') {
      setIsTitleInputed(false);
    }

    if (userId === 0) {
      setIsUserSelected(false);
    }

    if (userId === 0 || title.trim() === '') {
      return;
    }

    if (getUser(userId) !== null) {
      todos.push({
        id: getNewId + 1,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      });

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleSubmitForm(event);
        }}
      >
        <label>
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                isTitleCorrect(event.target.value);
                setIsTitleInputed(true);
              }}
            />
            {!isTitleInputed && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </label>

        <label>
          <div className="field">
            <select
              data-cy="userSelect"
              name="userId"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                setIsUserSelected(true);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {!isUserSelected && (
              <span className="error">Please choose a user</span>
            )}
          </div>
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
