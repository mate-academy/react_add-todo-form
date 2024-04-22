import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

const todoWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState(todoWithUsers);

  function getNewTodosId() {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  const halndleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const halndleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getNewTodosId(),
        title: title.trim(),
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="lable" htmlFor="form-title">
            Title:&nbsp;
          </label>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            id="form-title"
            value={title}
            onChange={halndleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="lable" htmlFor="form-User">
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="form-User"
            value={userId}
            onChange={halndleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
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
