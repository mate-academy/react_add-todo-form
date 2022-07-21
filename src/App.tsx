import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => (
    user.id === todo.userId) || null),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);

  const setEnteredTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleInvalid(false);
  };

  const setEnteredUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserNameInvalid(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = usersFromServer.find(
      user => user.name === userName,
    ) || null;

    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    if (!userName || !title) {
      setIsUserNameInvalid(!userName);
      setIsTitleInvalid(!title);

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Enter a title"
            value={title}
            onChange={setEnteredTitle}
          />

          {isTitleInvalid && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="select"
            value={userName}
            onChange={setEnteredUserName}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserNameInvalid && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-dark"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
