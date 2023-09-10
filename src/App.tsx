import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoWithUser } from './components/Types';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTittleError, setHasTittleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);

  function resetForm() {
    setTitle('');
    setUserId(0);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(cleanedValue);
    setHasTittleError(false);
  };

  const handleChangeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  function handleOnAdd(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTittleError(!title);
    setHasUserIdError(!userId);
    if (!title || !userId) {
      return;
    }

    const user = usersFromServer.find(({ id }) => id === userId);

    const todosIds = todos.map(({ id }) => id);
    const maxTodosId = Math.max(...todosIds);

    const newTodo = {
      id: maxTodosId + 1,
      title,
      userId,
      completed: false,
      user: user || null,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleOnAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            className={cn('input is-normal', {
              'is-danger': hasTittleError,
            })}
            onChange={handleChangeTitle}
          />
          {hasTittleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="control">
          <select
            data-cy="userSelect"
            value={userId}
            className={cn('select is-normal', {
              'is-danger': hasUserIdError,
            })}
            onChange={handleChangeId}
          >
            <option
              value="0"
              disabled
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
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
