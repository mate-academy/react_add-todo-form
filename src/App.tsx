import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const modifiedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(modifiedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserIdError, setIsUserIdError] = useState(false);
  const [isTitleErrorValidation, setIsTitleErrorValidation] = useState(false);

  const addNewTodo = () => {
    const uniqueId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: uniqueId,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setIsUserIdError(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const re = /^[A-Za-z1-9\s]*$/;
    const valid = re.test(title);

    if (title.length === 0) {
      setIsTitleError(true);
    }

    if (!valid) {
      setIsTitleErrorValidation(true);
    }

    if (!userId) {
      setIsUserIdError(true);
    }

    if (title && valid && userId) {
      addNewTodo();
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label
            className="label"
          >
            Title:&nbsp;
            <input
              className="input"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={e => handleTitleChange(e)}
            />
          </label>

          {isTitleError && <span className="error">Please enter a title</span>}

          {isTitleErrorValidation
            && (
              <span className="error">
                Only letters, digits and spaces are allowed
              </span>
            )}

        </div>

        <div className="field">
          <label className="field__label">
            User:&nbsp;
            <select
              className="select"
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={e => handleUserChange(e)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {isUserIdError
              && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
          className="button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
