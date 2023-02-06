import React, { ChangeEvent, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }
));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showSelectError, setShowSelectError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setShowSelectError(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setShowTitleError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowSelectError(false);
  };

  const handleSubmit = () => {
    setShowTitleError(true);
    setShowSelectError(true);

    if (title.length > 0 && userId !== 0) {
      const todoId = Math.max(...todos.map(todo => todo.id)) + 1;
      const currentUser = usersFromServer.find(user => user.id === +userId)
        || null;

      const newTodo = {
        id: todoId,
        title,
        completed: false,
        userId,
        user: currentUser,
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      reset();
    }
  };

  return (
    <div className="App m-5">
      <h1 className="title is-3">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <label htmlFor="title" className="label">Title:</label>
          <input
            className="input"
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          {(showTitleError && title.length === 0)
            && <span className="error mt-3">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user" className="label">User: </label>
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              value={userId}
              onChange={handleSelectChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {(showSelectError && userId === 0)
            && <span className="error mt-3">Please choose a user</span>}
        </div>

        <button
          className="button is-primary is-normal"
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
