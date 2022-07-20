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
  const [isTitleEntered, setIsTitleEntered] = useState(false);
  const [isUserNameEntered, setIsUserNameEntered] = useState(false);

  const setEnteredTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntered(false);
  };

  const setEnteredUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserNameEntered(false);
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

    const newTodo: Todo = {
      id: todos[todos.length - 1].id + 1,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    if (!userName || !title) {
      setIsUserNameEntered(!userName);
      setIsTitleEntered(!title);

      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Enter a title"
            value={title}
            onChange={setEnteredTitle}
          />

          {isTitleEntered && (
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

          {isUserNameEntered && (
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
