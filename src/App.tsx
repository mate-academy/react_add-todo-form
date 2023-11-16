import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const maxId = todosFromServer.reduce((max, current) => (
    current.id > max ? current.id : max
  ), 0);
  const [todos, setTodos] = useState(todosFromServer);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add to-do form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="App__form"
        onSubmit={(event) => {
          event.preventDefault();

          setHasTitleError(!todoTitle);
          setHasUserIdError(userId === 0);

          if (!todoTitle || userId === 0) {
            return;
          }

          setTodos((prevTodos) => [
            ...prevTodos,
            {
              id: maxId + 1,
              title: todoTitle,
              completed: false,
              userId,
            },
          ]);
          setTodoTitle('');
          setUserId(0);
        }}
      >
        <div className="field App__form_field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            placeholder="Enter title.."
            className="titleInput"
            onChange={handleTitleChange}
          />

          {hasTitleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field App__form_field">
          <select
            data-cy="userSelect"
            className="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserIdError
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button button--add"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
