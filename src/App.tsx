import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find((user) => userId === user.id) || null;
};

const getNewId = (array: { id: number }[]) => {
  return Math.max(...array.map((person) => person.id)) + 1;
};

const preparedTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.currentTarget.value);
  };

  const handleChangUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUserId(Number(event.currentTarget.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (title === '' || userId === 0) {
      return;
    }

    const user = getUserById(Number(userId));

    setTitle('');
    setUserId(0);

    setTodos((prev) => {
      const newTodo = {
        id: getNewId(prev),
        title,
        completed: false,
        userId: user ? user.id : null,
        user,
      };

      return [...prev, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <div className="wrapper">
        <form
          className="form"
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label>
              {'Title: '}
              <input
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={title}
                onChange={handleChangeTitle}
                className={classNames('select', { borderRed: isTitleError })}
              />
            </label>
            <div className="er">
              {isTitleError && (
                <span className="error">Please enter a title</span>
              )}
            </div>
          </div>

          <div className="field">
            <label>
              {'User: '}
              <select
                className={classNames('select', { borderRed: isUserError })}
                data-cy="userSelect"
                onChange={handleChangUser}
                value={userId}
              >
                <option value="0" disabled selected>
                  Choose a user
                </option>
                {usersFromServer.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="er">
              {isUserError && (
                <span className="error">Please choose a user</span>
              )}
            </div>
          </div>

          <button type="submit" data-cy="submitButton" className="btn-submit">
            Add
          </button>
        </form>
      </div>

      <TodoList todos={todos} />
    </div>
  );
};
