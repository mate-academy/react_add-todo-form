import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};

const todosData = () => {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: getUserById(todo.userId)!,
    };
  });
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [shouldShowErrorTitle, setShouldShowErrorTitle] = useState(false);
  const [shouldShowErrorUser, setShouldShowErrorUser] = useState(false);
  const [todos, setTodos] = useState(todosData());

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (shouldShowErrorTitle) {
      setShouldShowErrorTitle(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      if (!title) {
        setShouldShowErrorTitle(true);
      }

      if (!userId) {
        setShouldShowErrorUser(true);
      }

      return;
    }

    setShouldShowErrorUser(false);
    setShouldShowErrorTitle(false);

    const maxId = Math.max(0, ...todos.map(todoItem => todoItem.id));
    const selectedUser = getUserById(userId);

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: maxId + 1,
        title,
        userId,
        completed: false,
        user: selectedUser!,
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleChangeTitle}
            />
            {shouldShowErrorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User
            <select
              aria-label="User"
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(+event.target.value);

                if (shouldShowErrorUser) {
                  setShouldShowErrorUser(false);
                }
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            {shouldShowErrorUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
