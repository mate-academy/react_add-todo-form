import React, { ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const existedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isUserError, setUserError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);
  const [allTodos, setTodos] = useState(existedTodos);

  let newId = Math.max(...existedTodos.map(todo => todo.id));

  const createTodo = () => {
    newId += 1;

    return ({
      id: newId,
      title,
      userId: +userId,
      completed: false,
      user: getUser(+userId),
    });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError(false);
  };

  const handleAddTodoForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      const newTodo = createTodo();

      setTodos([
        ...allTodos,
        newTodo,
      ]);

      setTitle('');
      setUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodoForm}
      >
        <div className="field">
          <label>
            <input
              type="text"
              name="Title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
            {isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <select
              name="User"
              data-cy="userSelect"
              id="userSelect"
              value={userId}
              onChange={handleSelect}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {isUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={allTodos} />
    </div>
  );
};
