import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxId = Math.max(...newTodos.map(todo => todo.id)) + 1;

  const newTodo = {
    id: maxId,
    title,
    completed: false,
    userId,
    user: getUser(userId),
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
    setUserError(false);
  };

  const handleButton = () => {
    if (title && userId) {
      setNewTodo(prevTodos => (
        [...prevTodos, newTodo]
      ));
    }

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
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
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="username"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserId}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {[...usersFromServer].map(element => (
                <option
                  value={element.id}
                  key={element.id}
                >
                  {element.name}
                </option>
              ))}

            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleButton}
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
