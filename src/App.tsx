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
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [titleErrorValidation, setTitleErrorValidation] = useState(false);

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

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const userHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setUserIdError(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const re = /^[A-Za-z1-9\s]*$/;
    const valid = re.test(title);

    if (title.length === 0) {
      setTitleError(true);
    }

    if (!valid) {
      setTitleErrorValidation(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (title && valid && userId) {
      addNewTodo();
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={e => titleHandler(e)}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
          {titleErrorValidation
            && (
              <span className="error">
                Only letters, digits and spaces are allowed
              </span>
            )}

        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={e => userHandler(e)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {userIdError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
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
