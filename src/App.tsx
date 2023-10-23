import { FC, useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUser = (param: number) => {
  return usersFromServer
    .find(user => user.id === param)
    || null;
};

const preparedTodos = todosFromServer.map(todo => {
  const user = findUser(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: FC = () => {
  const [todos, setTodos] = useState(preparedTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(0);
  const [hasCurrentUserIdError, setHasCurrentUserIdError] = useState(false);

  const maxId = todos.map((todo) => todo.id).sort((a, b) => b - a)[0];

  const handleUserSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+e.target.value);
    setHasCurrentUserIdError(false);
  };

  const handleOnInput = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  });

  const handleOnSubmit = ((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title && !currentUserId) {
      setHasTitleError(!hasTitleError);
      setHasCurrentUserIdError(!hasCurrentUserIdError);

      return;
    }

    if (!title) {
      setHasTitleError(!hasTitleError);

      return;
    }

    if (!currentUserId) {
      setHasCurrentUserIdError(!hasCurrentUserIdError);

      return;
    }

    const newPost = {
      id: maxId + 1,
      title,
      userId: currentUserId,
      completed: false,
      user: findUser(currentUserId),
    };

    setTodos(prevState => [...prevState, newPost]);
    setTitle('');
    setCurrentUserId(0);
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleOnInput}
            placeholder="Enter post title"
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={currentUserId}
            onChange={handleUserSelectChange}
          >
            <option
              disabled
              value={0}
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasCurrentUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
