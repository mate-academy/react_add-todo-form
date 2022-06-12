import React, { useState } from 'react';
import classnames from 'classnames';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { FullTodo } from './react-app-env';

import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const fullTodo: FullTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);
  const [todos, setTodos] = useState(fullTodo);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);
  const [correctString, setCorrectString] = useState(true);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Zа-яА-Я\d\s]+$/.test(event.target.value)) {
      event.preventDefault();
      setCorrectString(false);

      return;
    }

    setTitle(event.target.value);
    setHasTitleError(false);
    setCorrectString(true);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);

    setUserIdError(!selectUserId);

    if (title && selectUserId) {
      const newTodo = {
        id: todos.length + 1,
        title,
        userId: selectUserId,
        completed: false,
        user: getUserById(selectUserId),
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);

      setTitle('');
      setSelectUserId(0);
      setCorrectString(true);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">ToDo</h1>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            className={classnames({
              error: hasTitleError || !correctString,
              form__field: true,
            })}
            name="title"
            placeholder="Write down the task"
            value={title}
            onChange={changeTitle}
          />

          {hasTitleError && (
            <span
              className="error-text"
            >
              Please enter the title
            </span>
          )}

          {!correctString && (
            <span className={classnames({
              string_error: !correctString,
              'error-text': true,
            })}
            >
              Enter only letters and digits
            </span>
          )}

          <select
            className={classnames({
              error: hasUserIdError,
              'field-select': true,
              select: true,
              'is-primary': true,
            })}
            name="user"
            value={selectUserId}
            onChange={selectUser}
          >
            <option value={0}>Choose a user</option>
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
            <span
              className="error-text"
            >
              Please choose a user
            </span>
          )}
        </div>
        <button
          type="submit"
          className="btn button is-success"
        >
          Add
        </button>
      </form>
      <TodoList listOfTodos={todos} />
    </div>
  );
};

export default App;
