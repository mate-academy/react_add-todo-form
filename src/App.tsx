import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [initialTodos, setInitialTodos] = useState(todosFromServer);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [title, setTitle] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const reset = (resetTitle = true, resetUser = true) => {
    if (resetTitle) {
      setTitle('');
    }

    if (resetUser) {
      setUserId(0);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = Boolean(title);
    const isUserIdValid = Boolean(userId);

    setHasTitleError(!isTitleValid);
    setHasUserIdError(!isUserIdValid);

    if (isTitleValid && isUserIdValid) {
      const maxId = Math.max(...initialTodos.map(todo => todo.id), 0);

      const newTodo = {
        id: maxId + 1,
        title,
        userId,
        completed: false,
      };

      setInitialTodos([...initialTodos, newTodo]);
      reset();
    } else {
      reset(isTitleValid, isUserIdValid);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            placeholder="Choose a user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError
          && <span className="error">Please choose a user</span> }
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
      <TodoList todos={initialTodos} />
    </div>
  );
};
